"use client"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {FaArrowAltCircleUp} from "react-icons/fa";
import {CiStop1} from "react-icons/ci";
import {useRef} from "react";
import {useChatInputStore} from "@/stores/chatInputStore";

interface Props {
    loading?: boolean
    onSubmit?: (text: string) => void
    onCancel?: () => void
}

export function ChatInput({loading, onSubmit, onCancel}: Props) {
    const {input, setInput} = useChatInputStore()
    return (
        <div className="flex w-full items-center space-x-2 ">
            <Input type="email" placeholder="Ask the AI something" onChange={e => setInput(e.target.value)}/>
            {loading ?
                <Button type="button" onClick={onCancel}>
                    <CiStop1 size={25}/>
                </Button>

                : <Button type="submit" onClick={() => onSubmit?.(input)}>
                    <FaArrowAltCircleUp size={25}/>
                </Button>
            }

        </div>
    )
}
