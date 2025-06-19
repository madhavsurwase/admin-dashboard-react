import { Home, LayoutGrid, TableIcon, BarChartBig, CalendarDays, Settings, ShieldQuestion } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/kanban", label: "Kanban Board", icon: LayoutGrid },
  { href: "/tables", label: "Interactive Tables", icon: TableIcon },
  { href: "/charts", label: "Dynamic Charts", icon: BarChartBig },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: ShieldQuestion },
];
