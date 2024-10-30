import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
    const id = (event.context.params as Record<string, string | undefined>)?.id;

    if (!id) {
        return { error: "ID parameter is missing from the request" };
    }

    const apiUrl = `https://himedic-fullstack-developer-test.onrender.com/api/book/getbook/${id}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { error: "Failed to fetch data from the external API" };
    }
});
