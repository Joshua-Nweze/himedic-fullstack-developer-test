<template>
    <NuxtLayout name="dashboard">
        More about book

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10" v-if="book">
            <div>
                <img
                    :src="`data:image/png;base64,${book.thumbnail}`"
                    class="h-80"
                    alt=""
                />
            </div>
            <div>
                <div class="font-bold text-lg">{{ book.title }}</div>
                <div>By {{ book.author }}</div>
                <div>Published on {{ book.publishedDate }}</div>
                <div>Genre: {{ book.genre }}</div>

                <div class="flex gap-5 mt-7" v-if="book.user == user">
                    
                    <Dialog>
                        <DialogTrigger>
                            <Button class="text-white bg-blue-500">Edit</Button>
                            
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit book</DialogTitle>
                                <DialogDescription class="grid gap-4">
                                    <Input placeholder="Book name"  v-model="title" />
                                    <Input placeholder="Arthor"  v-model="author" />
                                    <div>
                                        <Label for="publishedDate">Published date</Label>
                                        <Input type="date" id="publishedDate"  v-model="publishedDate" />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            
                            <DialogFooter>
                                <Button class="text-white bg-blue-500" @click="updateMyBook">Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div>
                        <Button class="text-white bg-red-500 w-full" v-if="!isDeleting" @click="delBook(book._id)" >Delete</Button>
                        <Button class="text-white bg-red-500 w-full" v-else >Deleting...</Button>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else>
            Loading..
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import Book from '~/types/BookType';
import Cookies from 'js-cookie';
import { useBookStore } from '~/store/useBook';

let { updateBook, deleteBook } = useBookStore()

let user = Cookies.get('user')

let book = ref<Book | any>(null);

let title = ref<string>()
let author = ref<string>()
let publishedDate = ref<string>()

let id = useRoute().params.id;
async function updateMyBook() {
    let bookData = {
        title: title.value,
        arthor: author.value,
        publishedDate: publishedDate.value
    }

    await updateBook(bookData, id as string)
}

let isDeleting = ref<boolean>(false)

async function delBook(id: string) {
    isDeleting.value = true
    await deleteBook(id)
    isDeleting.value = false

    useRouter().push('/books')
}

let route = useRoute().params

onMounted(async () => {
    setTimeout(async () => {    
        let { data } = await useFetch(`/api/book/getbook/${route.id}`);
    
        book.value = data.value.msg;
    
        title.value = book.value.title
        author.value = book.value.author
        publishedDate.value = book.value.publishedDate

    }, 50) // used this to fix not showing book on page load
});
</script>

<style scoped></style>
