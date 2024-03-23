import {createChat} from "@/app/[[...chatId]]/actions";
import {ChatContent} from "@/components/ChatContent";
import {db} from '@/db';
import {messages as messagesTable} from "@/db/schema/messages";
import {desc, eq, and} from "drizzle-orm";

export const ChatContentWrapper = async ({chatId}: { chatId: string }) => {
    const messages = await
        db.select().from(messagesTable)
            .where(and(eq(messagesTable.chatId, chatId), eq(messagesTable.role, "assistant")))
            .orderBy(desc(messagesTable.created_at)).get()
    return (
        <><ChatContent
            createChat={createChat}
            initialAssistantResponse={messages?.content}
        /></>
    );
};