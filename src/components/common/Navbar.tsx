import React, { useState } from 'react';
import { Button } from '../ui/button';
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar";
import { useTheme } from "./ThemeToggle"

type Theme = "dark" | "light";

const Navbar = () => {
    const currentTheme = localStorage.getItem('vite-ui-theme') as Theme;
    const [darkMode, setDarkMode] = useState<boolean>(currentTheme === 'dark');
    const isLoggedIn = !['/auth/login', '/auth/otp'].includes(window.location.pathname);
    const { setTheme } = useTheme();

    return (
        <nav className="px-3 fixed top-0 z-50 w-full border-b bg-background flex justify-between h-10 items-center">
            <div className='flex items-center'>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Demo Inc.
                </h2>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <Button
                        variant="secondary"
                        className={'rounded-full'}
                        size='icon-lg'
                        onClick={() => {
                            setDarkMode(prev => !prev)
                            setTheme(darkMode ? 'light' : 'dark')
                        }}
                    >
                        {darkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
                    </Button>
                </div>
                {isLoggedIn && <div className='flex items-center ml-3'>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            className="grayscale"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>}
            </div>
        </nav>
    );
}

export default Navbar;
