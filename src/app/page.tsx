import Image from "next/image";
import {Nav} from "@/components/Nav";
import {ChatInput} from "@/components/ChatInput";
import {ChatContent} from "@/components/ChatContent";
import {ChatList} from "@/components/ChatList";

export default function Home() {
  return (
    <div className=' flex w-full h-full'>
      <div className='w-80 h-full min-h-screen border-r-2 border-neutral-800 dark:border-neutral-300 overflow-auto'><ChatList/></div>
      <div className='h-full flex-1 flex flex-col'><ChatContent/></div>
    </div>
  );
}
