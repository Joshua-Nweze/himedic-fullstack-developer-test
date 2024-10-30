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

            this.books = data.value.msg || [];

            this.loadingBooks = false
        },

        async uploadBook(bookData: any) {
            let req = await fetch(`http://localhost:3001/api/book/create`, {
                method: "POST",
                body: bookData,
            });

            let res = await req.json();
            console.log(res);

            this.getMyBooks()

            return {
                msg: res.msg,
                status: req.status,
            };
        },

        async getMyBooks() {
            let req = await fetch(`http://localhost:3001/api/book/userbooks/${user}`)
            let res = await req.json()

            this.myBooks = res.msg
            console.log(res)

            this.loadingMyBooks = false
        },

        async updateBook(bookData: any, id: string) {
            console.log(1)
            let req = await fetch(`http://localhost:3001/api/book/updatebook/${id}`, {
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
            console.log('deleting')
            let req = await fetch(`http://localhost:3001/api/book/delete/${id}`, {
                method: "DELETE",
            });

            let res = await req.json();
            console.log(res);
            console.log('done')


            this.getMyBooks()

            return {
                msg: res.msg,
                status: req.status,
            };
        },
    },
});
