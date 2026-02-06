"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Contact,
  FileText,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  MessageSquare,
  User,
  Users
} from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  children?: { name: string; path: string }[];
};

const clientMenuItems: MenuItem[] = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  {
    name: "User Management", path: "/user-management", icon: Users,
    children: [
      { name: "Clients", path: "/user-management/clients" },
      { name: "Providers", path: "/user-management/providers" },
    ]
  },
  { name: "Appointments", path: "/appointments", icon: Calendar },
  { name: "Add Intake Form", path: "/add-intake-form", icon: FileText },
  { name: "Message", path: "/messages", icon: MessageSquare },
  {
    name: "Contact Management", path: "/contact-management", icon: Contact,
    children: [
      { name: "Blogs", path: "/contact-management/blogs" },
      // { name: "FAQ", path: "/contact-management/faq" },
    ]
  },
  { name: "My Profile", path: "/profile", icon: User },
];


export default function AppSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";


  const menuItems = clientMenuItems;



  const toggleItem = (name: string) => {
    setOpenItems(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  // Helper to determine active state
  const isActive = (path: string) => {
    if (path === "/my-dashboard" || path === "/provider") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent className="bg-[#6BB9BA] text-white flex flex-col h-full font-sans overflow-hidden">
        <SidebarHeader className={cn("p-6 sm:p-8 pb-4 transition-all duration-200", isCollapsed && "p-4")}>
          <Link href="/" className="flex items-center justify-center">
            <div className={cn("relative transition-all duration-300", isCollapsed ? "w-10 h-10" : "w-full max-w-[180px] h-12 sm:h-16")}>
              <Image
                src={isCollapsed ? "/icons/logo2.png" : "/icons/logo.png"}
                fill
                alt='logo'
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </SidebarHeader>
        {/* Navigation */}
        <SidebarGroup className="flex-1 px-0 mt-4 sm:mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                const hasChildren = "children" in item && !!item.children;
                const isSectionOpen = openItems.includes(item.name);

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild={!hasChildren}
                      onClick={hasChildren ? () => toggleItem(item.name) : undefined}
                      tooltip={item.name}
                      className={cn(
                        "h-12 sm:h-14 px-6 sm:px-8 w-full rounded-none transition-all duration-200 hover:bg-white/10 cursor-pointer",
                        "group-data-[collapsible=icon]:!h-14 group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center",
                        active
                          ? "bg-[#9B85C1] hover:bg-[#9B85C1] text-white font-medium relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-white/50"
                          : "text-white/90"
                      )}
                    >
                      {hasChildren ? (
                        <div className={cn("flex items-center gap-3 sm:gap-4 text-sm sm:text-base w-full", isCollapsed && "justify-center gap-0")}>
                          <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      ) : (
                        <Link href={item.path} className={cn("flex items-center gap-3 sm:gap-4 text-sm sm:text-base", isCollapsed && "justify-center gap-0")}>
                          <item.icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "text-white")} strokeWidth={1.5} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                      )}
                    </SidebarMenuButton>

                    <AnimatePresence>
                      {hasChildren && isSectionOpen && !isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <SidebarMenuSub className="border-none ml-10 flex flex-col gap-0 py-2">
                            {item.children?.map((child) => (
                              <SidebarMenuSubItem key={child.name}>
                                <SidebarMenuSubButton asChild className="h-10 hover:bg-white/10 rounded-none px-4">
                                  <Link href={child.path} className="flex items-center gap-3">
                                    <div className={cn(
                                      "w-1.5 h-1.5 rounded-full border border-white/50 bg-transparent shrink-0",
                                      pathname === child.path && "border-white bg-white"
                                    )} />
                                    <span className={cn(
                                      "text-xs sm:text-sm font-light text-white/80",
                                      pathname === child.path && "text-white font-medium"
                                    )}>
                                      {child.name}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer / Logout */}
        <SidebarFooter className={cn("p-6 sm:p-8 pb-8 sm:pb-10 transition-all duration-200", isCollapsed && "p-2 pb-10")}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={cn(
              "w-full h-10 sm:h-12 bg-[#FF5858] cursor-pointer hover:bg-[#ff4545] text-white rounded-xl font-medium flex items-center justify-center gap-2 sm:gap-3 shadow-lg transition-colors overflow-hidden whitespace-nowrap",
              isCollapsed && "rounded-full w-10 h-10 p-0 mx-auto"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className={cn("w-4 h-4 sm:w-5 sm:h-5 rotate-180 shrink-0", isCollapsed && "mr-0")} />
            {!isCollapsed && <span className="text-sm sm:text-base">Logout</span>}
          </motion.button>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  );
}