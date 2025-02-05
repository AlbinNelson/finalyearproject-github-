'use client'
import React from "react";
import { usePathname } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

const BlurPage = ({children}: Props) => {
    const pathname = usePathname()

    // Check for code page
    const isCodePage = pathname.includes('/funnels/') && pathname.includes('/editor/code/')

    // Conditional classes
    const positionClass = isCodePage 
        ? "absolute top-0 right-0 left-0 bottom-0" 
        : "absolute top-0 right-0 left-0 bottom-0"
    
    const paddingClass = isCodePage 
        ? "p-0" 
        : "pt-24 p-4"

    return (
        <div 
            className={`
                h-screen 
                overflow-scroll 
                backdrop-blur-[35px] 
                dark:bg-muted/40 
                bg-muted/60 
                dark:shadow-2xl 
                dark:shadow-black 
                mx-auto 
                z-[11] 
                ${positionClass} 
                ${paddingClass}
            `} 
            id="blur-page"
        >
            {children}
        </div>
    )
}

export default BlurPage;