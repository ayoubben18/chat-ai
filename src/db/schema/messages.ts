// id chat_id content role created at
//id name created_at
import {sql} from 'drizzle-orm'
import {sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import {chats} from "@/db/schema/chats";

export const messages = sqliteTable("messages", {
    id: integer('id').notNull().primaryKey(),
    chatId: text('chat_id').notNull().references(() => chats.id),
    content: text('name').notNull(),
    role: text('role', {enum: ['assistant', 'user']}).notNull(),
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull()
});