<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Upload a book</div>

        <div class="grid gap-5 lg:mx-44 mt-10">
			<Input type="text" placeholder="Book name" v-model="title"/>
			<Input type="text" placeholder="author name" v-model="author"/>
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
                <Input id="thumbnail" @change="handleFileChange" type="file" placeholder="Book name" accept=".png,.jpg,.jpeg" v-model="thumbnail" />
            </div>

            <Button class="bg-blue-500 text-white" @click="upload" > Upload book </Button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/useAuth";
import { useBookStore } from "~/store/useBook";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";

const df = new DateFormatter("en-US", {
    dateStyle: "long",
});

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
let thumbnail = ref<any>(null)
let genre = ref<string>('')
let publishedDate = ref<string>('');

function handleFileChange (event: any) {
    thumbnail.value = event.target.files[0];
}

async function upload() {
    let formData = new FormData();

    let user = Cookies.get('user') || ""

    formData.append('user', user);
    formData.append('title', title.value);
    formData.append('author', author.value);
    formData.append('thumbnail', thumbnail.value);
    formData.append('genre', genre.value);
    formData.append('publishedDate', publishedDate.value);

    let res = await uploadBook(formData)
    console.log(res)

}
</script>