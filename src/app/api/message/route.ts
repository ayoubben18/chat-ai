import OpenAI from "openai";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {initialProgrammerMessages} from "@/app/api/message/messages";
import {db} from "@/db/index"
import {chats} from "@/db/schema/chats";
import {eq} from "drizzle-orm";
import {messages} from "@/db/schema/messages";

export const runtime = 'edge'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// a post request to openai api
export async function POST(req: Request) {

    const {content, chatId} = await req.json();
    // auth middleware
    if (!chatId) {
        return new Response("Chat Id not found !!", {
            status: 400
        })
    }
    const chat = await db.select().from(chats).where(eq(chats.id, chatId)).get()
    if (!chat) {
        return new Response("Chat not found !!", {
            status: 400
        })
    }


    //send that content to open ai
    const chatCompletion = await openai.chat.completions.create({
        messages: [...initialProgrammerMessages, {role: "user", content: content}],
        model: "gpt-3.5-turbo",
        stream: true
    });
    const stream = OpenAIStream(chatCompletion, {
        onStart: async () => {

        },
        onToken: async (token: string) => {

        },
        onCompletion: async (completion: string) => {

            try {
                await db.insert(messages).values([{
                    chatId: chatId,
                    content: content,
                    role: 'user',
                }, {
                    chatId: chatId,
                    content: completion,
                    role: 'assistant',
                }])
            } catch (e) {
                console.error(e)
            }

        },
    });
    return new StreamingTextResponse(stream)
}