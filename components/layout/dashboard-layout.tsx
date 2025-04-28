"use client";

import type React from "react";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <MobileNav />
        <main
          className={cn(
            "relative flex-1 overflow-y-auto focus:outline-none transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          )}
        >
          <div className="py-6 h-full max-h-[calc(100vh-3rem)] flex flex-col">
            <div className="mx-auto px-4 sm:px-6 md:px-8 flex-1 flex flex-col">
              <div className="bg-white rounded-2xl shadow-sm border border-border h-full flex flex-col overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
