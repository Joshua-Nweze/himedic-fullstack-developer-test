import { defineStore } from "pinia";
import Book from "~/types/BookType";
import Cookies from "js-cookie";

let user = Cookies.get('user')

interface BookState {
    books: Book[] | null;
    myBooks: Book[] | null;
    loadingMyBooks: boolean
    loadingBooks: boolean
}

export const useBookStore = defineStore("book", {
    state: (): BookState => ({
        books: null, // Ensure the state matches the type definition
        myBooks: null,
        loadingMyBooks: true,
        loadingBooks: true
    }),

    actions: {
        async getBooks() {
            const { data } = await useFetch<Book[]>("/api/book/getbook", {
                method: "POST",
            });

            this.books = data?.value || [];

            this.loadingBooks = false
        },

        async uploadBook(bookData: any) {
            let req = await fetch(`https://himedic-fullstack-developer-test.onrender.com/api/book/create`, {
                method: "POST",
                body: bookData,
            });

            let res = await req.json();

            this.getMyBooks()

            return {
                msg: res.msg,
                status: req.status,
            };
        },

        async getMyBooks() {
            let req = await fetch(`https://himedic-fullstack-developer-test.onrender.com/api/book/userbooks/${user}`)
            let res = await req.json()

            this.myBooks = res.msg

            this.loadingMyBooks = false
        },

        async updateBook(bookData: any, id: string) {
            let req = await fetch(`https://himedic-fullstack-developer-test.onrender.com/api/book/updatebook/${id}`, {
                method: "PUT",
                body: JSON.stringify(bookData),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            let res = await req.json();

            if(req.ok) {
                this.getMyBooks()
            }

            return {
                msg: res.msg,
                status: req.status,
            };
        },

        async deleteBook(id: string) {
            let req = await fetch(`https://himedic-fullstack-developer-test.onrender.com/api/book/delete/${id}`, {
                method: "DELETE",
            });

            let res = await req.json();

            this.getMyBooks()

            return {
                msg: res.msg,
                status: req.status,
            };
        },
    },
});
