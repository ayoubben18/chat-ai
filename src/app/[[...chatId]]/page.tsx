import {ChatContent} from "@/components/ChatContent";
import ChatList from "@/components/ChatList";
import {createChat} from "@/app/[[...chatId]]/actions";
import {Suspense} from "react";
import {ChatContentWrapper} from "@/components/ChatContentWrapper";

export default function Home({params}: { params: { chatId?: string[] } }) {
    const chatId = params.chatId?.[0];
    return (
        <div className=' flex w-full h-screen min-h-screen'>
            <div
                className='w-80 h-full border-r-2 border-neutral-800 dark:border-neutral-300 overflow-auto'>
                <Suspense fallback={<div>Loading ...</div>}>
                    <ChatList/>
                </Suspense>
            </div>
            <div className='h-full flex-1 flex flex-col'>
                {chatId ? (
                    <Suspense fallback={<div>Loading ...</div>}>
                        <ChatContentWrapper chatId={chatId}/>
                    </Suspense>
                ) : (<ChatContent createChat={createChat}/>)}

            </div>

        </div>
    );
}
