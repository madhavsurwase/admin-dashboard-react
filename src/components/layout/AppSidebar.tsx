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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, LayoutGrid, TableIcon, BarChartBig, CalendarDays, Settings, ShieldQuestion, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/kanban", label: "Kanban Board", icon: LayoutGrid },
  { href: "/tables", label: "Interactive Tables", icon: TableIcon },
  { href: "/charts", label: "Dynamic Charts", icon: BarChartBig },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
];

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
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
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
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/settings" legacyBehavior passHref>
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
                        <a>
                            <Settings className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                        </a>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <Link href="/help" legacyBehavior passHref>
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
                        <a>
                            <ShieldQuestion className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">Help & Support</span>
                        </a>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
