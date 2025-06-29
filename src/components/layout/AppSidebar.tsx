
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, LayoutGrid, TableIcon, BarChartBig, CalendarDays, Settings, ShieldQuestion, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems as appNavItems } from "./navItems"; // Renamed to avoid conflict

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const Logo = () => (
    <Link href="/dashboard" className="flex items-center gap-2 px-2" onClick={() => setOpenMobile(false)}>
      <Briefcase className="h-8 w-8 text-primary" />
      <span className="text-2xl font-headline font-bold text-primary">DashFlow</span>
    </Link>
  );

  return (
    <Sidebar variant="inset" collapsible="icon" side="left">
      <SidebarHeader className="h-16 border-b">
         <div className="flex items-center justify-between w-full">
            <Logo />
         </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {appNavItems.filter(item => item.href === '/dashboard' || item.href === '/kanban' || item.href === '/tables' || item.href === '/charts' || item.href === '/calendar').map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                tooltip={item.label}
                onClick={() => setOpenMobile(false)}
                className={cn(
                  "justify-start",
                  (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)))
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === "/settings"}
                    tooltip="Settings"
                    onClick={() => setOpenMobile(false)}
                    className={cn(
                        "justify-start",
                        pathname === "/settings"
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                >
                    <Link href="/settings">
                        <Settings className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === "/help"}
                    tooltip="Help & Support"
                    onClick={() => setOpenMobile(false)}
                    className={cn(
                        "justify-start",
                        pathname === "/help"
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                >
                     <Link href="/help">
                        <ShieldQuestion className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Help & Support</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
