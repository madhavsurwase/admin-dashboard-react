"use client";
import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { usePathname } from 'next/navigation';
import { navItems } from '@/components/layout/navItems'; // Assuming navItems is defined here or imported

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentNavItem = navItems.find(item => pathname.startsWith(item.href));
  const pageTitle = currentNavItem ? currentNavItem.label : "DashFlow";

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarRail />
      <SidebarInset>
        <AppHeader pageTitle={pageTitle} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
