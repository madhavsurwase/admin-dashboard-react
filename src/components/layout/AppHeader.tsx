"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Sun, Moon, UserCircle, Settings, LogOut } from "lucide-react";
import React from "react";

export function AppHeader({ pageTitle }: { pageTitle: string }) {
  const { isMobile, toggleSidebar } = useSidebar();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  
  // For theme toggle - basic structure, not fully implemented
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () => {
    // Basic theme toggle logic placeholder
    setTheme(current => (current === "light" ? "dark" : "light"));
    // In a real app, this would also change CSS classes on the body or html tag
  };


  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> {/* Placeholder for trigger */}
        <div className="flex-1 h-6 w-32 bg-muted animate-pulse rounded" /> {/* Placeholder for title */}
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" /> {/* Placeholder for avatar */}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      {isMobile ? (
        <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={toggleSidebar} aria-label="Toggle navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      ) : (
        <SidebarTrigger className="hidden md:flex" />
      )}
      
      <div className="flex-1">
        <h1 className="text-xl font-headline font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person avatar" />
                <AvatarFallback>
                  <UserCircle />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">DashFlow User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@dashflow.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
