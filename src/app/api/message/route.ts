import OpenAI from "openai";
import {OpenAIStream, StreamingTextResponse} from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// a post request to openai api
export async function POST(req:Request) {

    const {content} = await req.json();

    //send that content to open ai
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-3.5-turbo",
        stream:true
    });
    const stream = OpenAIStream(chatCompletion);
    return new StreamingTextResponse(stream)
}