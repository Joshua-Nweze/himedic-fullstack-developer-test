import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    console.log("running");

    const apiUrl = "http://localhost:3001/api/book/getbook";

    try {
        return await fetch(apiUrl);
    } catch (error) {
        console.error(error);
        return { error: "Failed to submit data to the external API" };
    }
});
