"use client"
import {Nav} from "@/components/Nav";
import {ChatInput} from "@/components/ChatInput";
import {useToast} from "@/components/ui/use-toast"
import {useRef, useState} from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
    createChat: () => Promise<{ id: string; }>
    initialAssistantResponse?: string
}

export const ChatContent = ({createChat, initialAssistantResponse = ""}: Props) => {
    const [assistantResponse, setAssistantResponse] = useState(initialAssistantResponse)
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const abortControllerRef = useRef<AbortController | null>(null)
    const [chatId, setChatId] = useState<string | null>("")
    const handleSubmit = async (text: string) => {
        let currentChatId = chatId
        if (!chatId) {
            const chat = await createChat()
            currentChatId = chat.id
            setChatId(chat.id)
        }
        try {
            setLoading(true)
            setAssistantResponse("")
            abortControllerRef.current = new AbortController()
            const res = await fetch("/api/message",
                {
                    method: "POST",
                    body: JSON.stringify({content: text, chatId: currentChatId}),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    signal: abortControllerRef.current.signal
                })
            if (!res.ok || !res.body) {
                toast({
                    variant: "destructive",
                    title: "Error Sending message",
                    description: "There was an error sending",

                })
            }
            const reader = res.body!.getReader()
            const decoder = new TextDecoder()
            while (true) {
                const {value, done} = await reader.read()
                const text = decoder.decode(value)
                setAssistantResponse(current => current + text)
                if (done) {
                    break
                }
            }
        } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") {
                toast({
                    description: "The answer is stopped in the middle !",
                })
                return
            }
            toast({
                variant: "destructive",
                title: "Error Sending message",
                description: "There was an error sending",

            })
        }
        abortControllerRef.current = null
        setLoading(false)
    }

    const handleCancel = () => {
        if (!abortControllerRef.current) {
            return
        }
        abortControllerRef.current.abort()
        abortControllerRef.current = null
        setLoading(false)
    }
    return (
        <div className="container flex flex-col h-screen">
            <div className='flex-grow'>
                <Nav/>
                <div className='prose dark:prose-invert'>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <SyntaxHighlighter
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={dracula}
                                        wrapLines={true}
                                        wrapLongLines={true}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {assistantResponse}
                    </Markdown>
                </div>
            </div>


            <ChatInput loading={loading} onSubmit={handleSubmit}
                       onCancel={handleCancel}/>
        </div>
    );
};