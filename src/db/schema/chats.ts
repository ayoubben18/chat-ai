//id name created_at
import {sql} from 'drizzle-orm'
import {sqliteTable, text} from "drizzle-orm/sqlite-core";

export const chats = sqliteTable("chats", {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull()
});