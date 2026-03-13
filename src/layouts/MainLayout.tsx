import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import { SidebarProvider } from "../components/ui/sidebar"
import { AppSidebar } from "../components/common/Sidebar"

const MainLayout = () => {
    const location = useLocation()

    const inAuth = ["/auth/login", "/auth/otp"].includes(
        location.pathname
    )

    return (
        <div className="w-full">
            <SidebarProvider defaultOpen={false}>
                <div className="min-h-screen flex w-full flex-col">

                    {/* navbar */}
                    <Navbar />

                    {/* body */}
                    <div className="flex flex-1 pt-10 w-full min-w-0 relative h-screen">

                        {/* Sidebar */}
                        {!inAuth && <AppSidebar />}

                        <main className="flex-1 p-4 min-w-0 overflow-auto">
                            <Outlet />
                        </main>

                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default MainLayout