import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    console.log("running");

    const apiUrl = "https://himedic-fullstack-developer-test.onrender.com/api/book/getbook";

    try {
        let req =  await fetch(apiUrl);
        let res = await req.json()

        return res.msg
    } catch (error) {
        console.error(error);
        return { error: "Failed to submit data to the external API" };
    }
});
