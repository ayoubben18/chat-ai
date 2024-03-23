import {create} from "zustand";


interface ChatInputStore {
    input: string
    setInput: (input: string) => void
}

export const useChatInputStore = create<ChatInputStore>((set) => ({
    input: "",
    setInput: (input) => set({ input }),
}))