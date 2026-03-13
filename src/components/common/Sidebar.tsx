import { useEffect, useRef, useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
    useSidebar
} from "../ui/sidebar"

export function AppSidebar() {
    const { open, setOpen } = useSidebar()
    const [hovered, setHovered] = useState<boolean>(false)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const handleRailClick = () => {
        if (!open) setOpen(true)
        else setOpen(false)
    }

    const handleSidebarClick = () => {
        if (!open) setOpen(true)
    }

    // click outside logic
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!open) return

            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open, setOpen])

    return (
        <div ref={sidebarRef} className="relative flex h-full group/sidebar-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            {/* Sidebar */}
            <Sidebar collapsible="icon" className="cursor-pointer h-full flex shrink-0" onClick={handleSidebarClick}>
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>

            {/* sidebar toggle button */}
            <div className="absolute top-0 inset-y-0 left-full h-full w-6 z-40 cursor-pointer" onClick={handleRailClick}>
                <div className={`transition absolute top-2 left-2 opacity-100 translate-x-0 md:opacity-0 md:translate-x-0 md:${hovered ? "opacity-100 md:translate-x-0" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(!open)
                    }}>
                    <SidebarTrigger variant="secondary" />
                </div>
            </div>

        </div>
    )
}