<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Upload a book</div>

        <div class="grid gap-5 lg:mx-44 mt-10">
			<Input type="text" placeholder="Book name" v-model="title"/>
			<Input type="text" placeholder="Author name" v-model="author"/>
            <div>
                <Label for="publishedDate">Published Date</Label>
                <Input id="publishedDate" type="date" v-model="publishedDate"/>
            </div>

			<Select class="bg-white text-black" v-model="genre">
				<SelectTrigger class="bg-white text-black">
					<SelectValue placeholder="Select book genre" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup class="bg-white text-black">
						<SelectLabel class="bg-white text-black">Select book genre</SelectLabel>
						<SelectItem class="bg-white text-black" v-for="genre in bookGenres" :value="genre">
							{{ genre }}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

            <div>
                <Label for="thumbnail">Thumbnail</Label>
                <Input id="thumbnail" @change="handleFileChange" type="file" placeholder="Book name" accept=".png,.jpg,.jpeg" />
            </div>

            <div class="w-full">
                <Button class="bg-blue-500 text-white w-full" v-if="!loading" @click="upload" > Upload book </Button>
                <Button class="bg-blue-500 text-white w-full"  v-else> Loading... </Button>
            </div>
        </div>

        <div class="fixed right-5 bottom-5" v-if="feedback" >
            <Alert :status>{{ feedback }}</Alert>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/useAuth";
import { useBookStore } from "~/store/useBook";
import Cookies from "js-cookie";

let { uploadBook } = useBookStore()

const bookGenres: string[] = [
    "Adventure",
    "Biography",
    "Classics",
    "Comics",
    "Contemporary",
    "Crime",
    "Drama",
    "Dystopian",
    "Fantasy",
    "Graphic Novel",
    "Historical Fiction",
    "Horror",
    "Mystery",
    "Non-Fiction",
    "Philosophy",
    "Poetry",
    "Psychology",
    "Romance",
    "Science Fiction",
    "Self-Help",
    "Short Story",
    "Suspense",
    "Thriller",
    "Travel",
    "Young Adult"
];

let title = ref<string>("")
let author = ref<string>("")
let thumbnail = ref<File | null>(null)
let genre = ref<string>('')
let publishedDate = ref<string>('');

let loading = ref<boolean>(false)
let feedback = ref<string | null>(null)
let status = ref<number | null>(null)

function handleFileChange (event: any) {
    thumbnail.value = event.target.files[0];
}

async function upload() {
    feedback.value = status.value = null // hiding the feedback alert
    loading.value = true

    let formData = new FormData();

    let user = Cookies.get('user') || ""

    formData.append('user', user);
    formData.append('title', title.value);
    formData.append('author', author.value);
    formData.append('thumbnail', thumbnail.value as Blob);
    formData.append('genre', genre.value);
    formData.append('publishedDate', publishedDate.value);

    console.log(formData.entries)

    let res = await uploadBook(formData)
    console.log(res)
    
    loading.value = false
    
    feedback.value = res.msg
    status.value = res.status
    console.log(feedback.value)

    setTimeout(() => {
        feedback.value = status.value = null // hiding the feedback alert
    }, 3000)

}
</script>