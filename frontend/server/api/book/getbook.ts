import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    console.log("running");

    const apiUrl = "https://himedic-fullstack-developer-test.onrender.com/api/book/getbook";

    try {
        return await fetch(apiUrl);
    } catch (error) {
        console.error(error);
        return { error: "Failed to submit data to the external API" };
    }
});
