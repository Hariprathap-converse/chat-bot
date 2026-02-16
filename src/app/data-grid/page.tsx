"use client";

import { AppSidebar } from "@/client/app-sidebar";
import Profile from "@/client/profile";
import { DataGrid } from "@/components/data-grid";
import {  useSidebar } from "@/components/ui/sidebar";

import { sampleTableData } from "@/components/data-grid/sample-data";
import ModelSelection from "@/components/chat/model-selection";

export default function DataGridPage() {
  const { setOpen } = useSidebar();

  return (
    <div className="bg-background relative min-h-screen w-full pb-0 pr-1 flex flex-col items-center justify-center overflow-hidden">
      {/* Header - Profile */}
      <div className="absolute right-20 top-3">
        <ModelSelection />
      </div>
      <div className="absolute right-3 top-1.5 z-50">
        <Profile />
      </div>

      {/* Sidebar */}
      <div className="absolute left-5 rounded-2xl top-5 z-50">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex flex-col w-full h-full pt-[60px] max-h-screen overflow-hidden items-end px-4 mr-[2.5%] md:px-0">
        <div className="w-full max-w-[93%] flex flex-col max-h-[calc(100vh-30px)] h-full py-4 pt-0  duration-700 ">
          <DataGrid config={sampleTableData} />
        </div>
      </main>
    </div>
  );
}
