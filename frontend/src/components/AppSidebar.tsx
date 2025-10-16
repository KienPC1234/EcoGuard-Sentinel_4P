"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, Tractor, Calendar, Settings, HelpCircle, Leaf } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

const menuItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/fields",
    icon: Tractor,
    label: "My Fields",
  },
  {
    href: "/schedule",
    icon: Calendar,
    label: "My Schedule",
  },
];

const bottomMenuItems = [
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
    {
      href: "/help",
      icon: HelpCircle,
      label: "Help Center",
    },
  ];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/chat" passHref>
                    <SidebarMenuButton 
                        asChild
                        isActive={pathname.startsWith("/chat")}
                        className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-foreground font-semibold"
                        tooltip={{children: "Ask Sprout AI"}}
                    >
                    <span>
                        <Bot className="text-primary" />
                        <span>Ask Sprout AI</span>
                    </span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{
                    children: item.label,
                  }}
                >
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <SidebarMenu>
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{
                        children: item.label,
                    }}
                    >
                    <span>
                        <item.icon />
                        <span>{item.label}</span>
                    </span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
