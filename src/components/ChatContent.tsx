"use client"
import {Nav} from "@/components/Nav";
import {ChatInput} from "@/components/ChatInput";
import {useToast} from "@/components/ui/use-toast"


export const ChatContent = () => {
    const {toast} = useToast()

    const handleSubmit = async (text: string) => {
        const res = await fetch("/api/message",
            {
                method: "POST",
                body: JSON.stringify({content: text}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        if (!res.ok || !res.body) {
            toast({
                title: "Error Sending message",
                description: "There was an error sending",

            })
        }
        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let result = ""
        while (true) {
            const {value, done} = await reader.read()
            const text = decoder.decode(value)
            result += text
            console.log(result)
            if (done) {
                break
            }
        }
    }
    return (
        <div className="container flex flex-col h-screen">
            <div className='flex-grow'><Nav/></div>
            <footer className='pb-4'><ChatInput onSubmit={handleSubmit}/></footer>
        </div>
    );
};