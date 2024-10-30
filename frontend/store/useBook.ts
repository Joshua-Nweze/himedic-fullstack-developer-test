import { defineStore } from "pinia";
import Book from "~/types/BookType";

interface BookState {
    books: Book[] | null; // Changed 'book' to 'books' for clarity
}

export const useBookStore = defineStore("book", {
    state: (): BookState => ({
        books: null, // Ensure the state matches the type definition
    }),

    actions: {
        async getBooks() {
            // try {
            const { data } = await useFetch<Book[]>("/api/book/getbook", {
                method: "POST",
            });

            this.books = data.value || []
        },
    },
});
