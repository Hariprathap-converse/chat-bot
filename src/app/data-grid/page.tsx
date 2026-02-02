"use client";

import { AppSidebar } from "@/client/app-sidebar";
import Profile from "@/client/profile";
import { DataGrid } from "@/components/data-grid";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const sampleConfig = {
    title: "Leaderboard",
    columns: [
        { accessorKey: "user", header: "User", width: 220 },
        { accessorKey: "language", header: "Language", width: 140 },
        { accessorKey: "game", header: "Game of Choice", width: 180 },
        { accessorKey: "revenue", header: "Total Revenue", width: 150 },
        { accessorKey: "added", header: "Added", width: 150 },
        { accessorKey: "trend", header: "Trend", width: 120 },
        { accessorKey: "lastUpdate", header: "Last Update", width: 150 },
    ],
    data: [
        { id: "1", user: "Jane Cooper", language: "English", game: "Chess", revenue: "$23,392", added: "21 Apr 2024", trend: "+90.01%", lastUpdate: "21 Apr 2024" },
        { id: "2", user: "Arlene McCoy", language: "German", game: "Rithmomachy", revenue: "$31,112", added: "20 Apr 2024", trend: "-3.01%", lastUpdate: "17 Apr 2024" },
        { id: "3", user: "Darrell Steward", language: "Dutch", game: "Hare and Hounds", revenue: "$313,492", added: "17 Apr 2024", trend: "+12.01%", lastUpdate: "28 Mar 2024" },
        { id: "4", user: "Tony Smith", language: "English", game: "Nine Men's Morris", revenue: "$166,192", added: "28 Mar 2024", trend: "-4.32%", lastUpdate: "19 Mar 2024" },
        { id: "5", user: "Cody Fisher", language: "English", game: "Downfall", revenue: "$43,392", added: "19 Mar 2024", trend: "+160.00%", lastUpdate: "21 Jan 2024" },
        { id: "6", user: "Kathryn Murphy", language: "Chinese", game: "Cross and Circle", revenue: "$3,384", added: "27 Dec 2023", trend: "+23.95%", lastUpdate: "27 Dec 2023" },
        { id: "7", user: "Floyd Miles", language: "Burmese", game: "Hare and Hounds", revenue: "$23,091", added: "1 Dec 2023", trend: "+90.01%", lastUpdate: "1 Dec 2023" },
    ]
};

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
                    <DataGrid config={sampleConfig} />
                </div>
            </main>
        </div>
    );
}
