import {ModeToggle} from "@/components/ThemeToggle";

export const Nav = () => {
    return (
        <nav className='flex justify-between items-center top-0 pt-4'>
            <h1 className=' text-2xl font-bold'>Chat-ai</h1>
            <ModeToggle/>
        </nav>
    );
};