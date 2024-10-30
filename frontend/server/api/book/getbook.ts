import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    console.log("running");

    const apiUrl = "http://localhost:3001/api/book/getbook"; // External API endpoint

    try {
        // const response = await fetch(apiUrl, {
        //     // method: "POST",
        //     // body: requestBody,
        //     // headers: {
        //     //     "Content-Type": "application/json",
        //     // },
        // });

        // console.log(response);
        // return ":ok"
        return await fetch(apiUrl); // Return the API response to the client
    } catch (error) {
        console.error(error);
        return { error: "Failed to submit data to the external API" };
    }
});
