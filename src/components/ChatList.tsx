import {db} from "@/db";
import {chats as chatsTable} from "@/db/schema/chats";
import {unstable_cache as cache} from 'next/cache'

const getChats = cache(
    async () => await db.select({id: chatsTable.id, name: chatsTable.name}).from(chatsTable).all()
    , ['chats'],
    {
        tags: ['chats'],
    })

export default async function ChatList() {
    await new Promise(resolve => setTimeout(resolve, 5000))
    const chats = await getChats()
    return (
        <div className="w-full">

            <div className="flex flex-col">
                {/* Header */}
                <div className="flex">
                    <div className="flex-1 py-2 px-4 font-bold text-center border-b-2">Recent Chats</div>
                </div>

                <div className="flex flex-col">
                    {chats.map(chat => (
                        <a key={chat.id} href={`/${chat.id}`} className="flex border-b hover:bg-neutral-500">
                            <div className="flex-1 py-2 px-4 text-center">{chat.name}</div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="text-md font-semibold text-center py-2">Your recent chats️</div>
        </div>

    );
};

