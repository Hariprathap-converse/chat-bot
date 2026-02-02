"use client";

import { AppSidebar } from "@/client/app-sidebar";
import Profile from "@/client/profile";
import { DataGrid } from "@/components/data-grid";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { sampleTableData } from "@/components/data-grid/sample-data";

export default function DataGridPage() {
    const { setOpen } = useSidebar();

    return (
        <div className="bg-background relative min-h-screen w-full pb-0 pr-1 flex flex-col items-center justify-center overflow-hidden">
            {/* Header - Profile */}
            <div className="absolute right-3 top-1.5 z-50">
                <Profile />
            </div>
            <div className="absolute left-5 top-4 z-50">
                <SidebarTrigger
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                ></SidebarTrigger>
            </div>

            {/* Sidebar */}
            <div className="absolute left-5 rounded-2xl top-5 z-50">
                <AppSidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex flex-col w-full h-full pt-[60px] max-h-screen overflow-hidden items-center px-4 md:px-0">
                <div className="w-full max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%] flex flex-col h-[calc(100vh-100px)] py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <DataGrid config={sampleTableData} />
                </div>
            </main>
        </div>
    );
}
