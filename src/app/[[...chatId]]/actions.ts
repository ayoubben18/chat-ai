"use server"

import {db} from "@/db"
import {chats} from "@/db/schema/chats";
import {v4 as uuidv4} from 'uuid';
import {revalidateTag} from "next/cache";

export async function createChat() {
    //middleware user auth
    const id = uuidv4()
    //create a new chat entity and get the id using drizzle server actions
    await db.insert(chats).values({
        id: id,
        name: id,
    })
    revalidateTag("chats")
    return {id}
}