"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function MyNavber() {
  const pathname = usePathname();
  const isProvider = pathname.startsWith("/provider");
  const router = useRouter();

  return (
    <header className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 bg-white px-3 sm:px-6 w-full shrink-0 border-b border-gray-100/50">

      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
        <SidebarTrigger className="h-9 w-9 sm:h-10 sm:w-10 bg-[#EDF7F7] cursor-pointer hover:bg-[#dceeee] text-[#6BB9BA] rounded-xl shadow-none border-0 [&_svg]:h-4 sm:[&_svg]:h-5 [&_svg]:w-4 sm:[&_svg]:w-5 shrink-0" />
        <h1 className="text-base sm:text-xl font-bold text-foreground truncate max-w-[120px] sm:max-w-none">My Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 shrink-0">

        <Button onClick={() => router.push("/notification")} variant="ghost" size="icon" className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-[#F5F3FF] hover:bg-[#ebe6ff] text-foreground cursor-pointer">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 border-2 border-white ring-0" />
        </Button>

        <div onClick={() => router.push("/profile")} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-foreground leading-none mb-1 group-hover:text-[#6BB9BA] transition-colors line-clamp-1">Rasel Parvez</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{isProvider ? "Provider" : "Client"}</p>
          </div>
          <Avatar className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl border border-border/50 group-hover:border-[#6BB9BA]/50 transition-colors">
            <AvatarImage src="https://github.com/shadcn.png" alt="Rasel Parvez" />
            <AvatarFallback className="rounded-xl bg-[#6BB9BA] text-white text-xs sm:text-base">RP</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  )
}