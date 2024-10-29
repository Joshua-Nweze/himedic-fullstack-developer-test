<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Upload a book</div>

        <div class="grid gap-5 lg:mx-44 mt-10">
			<Input type="text" placeholder="Book name"/>

            <Popover>
                <PopoverTrigger as-child>
                    <Button
                        variant="outline"
                        :class="
                            cn('w-full justify-start text-left font-normal', !publishedDate && 'text-muted-foreground')"
                    >
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        {{
                            publishedDate ? df.format( publishedDate.toDate(getLocalTimeZone())) : "Published date"
                        }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <Calendar v-model="publishedDate" initial-focus />
                </PopoverContent>
            </Popover>

			<Select class="bg-white text-black">
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
                <Input id="thumbnail"type="file" placeholder="Book name" accept=".png,.jpg,.jpeg" />
            </div>

            <Button class="bg-blue-500 text-white"> Upload book </Button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
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

const publishedDate = ref<DateValue>();

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

</script>