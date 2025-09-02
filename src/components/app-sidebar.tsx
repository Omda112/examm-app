// components/app-sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FolderCode, GraduationCap, UserRound } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Diplomas", href: "/", icon: GraduationCap },
  { title: "Account Settings", href: "/account", icon: UserRound },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession(); // ✔️ بدل getServerSession

  return (
    <Sidebar className="h-vh border-r border-gray-200">
      <SidebarContent className="flex h-full flex-col bg-blue-50">

        <div className="p-5">
          <div className="flex flex-col gap-4">
            <Image src="/final logo 1.svg" alt="Elevate" width={120} height={36} className="h-auto w-[120px]" priority />
            <div className="flex items-center gap-2">
              <FolderCode className="h-8 w-8 text-blue-700" />
              <span className="text-sm font-semibold text-blue-700/80">Exam App</span>
            </div>
          </div>
        </div>

        <SidebarGroupContent className="px-3">
          <SidebarMenu className="space-y-2">
            {items.map(({ title, href, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link
                      href={href}
                      className={[
                        "flex items-center gap-3 rounded-none px-3 py-6 text-sm transition",
                        "border",
                        active
                          ? "!bg-blue-100 !text-blue-600 border border-[#2B7FFF]"
                          : "bg-transparent text-gray-700 border-transparent hover:bg-white hover:text-gray-900",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className={active ? "!h-6 !w-6 text-blue-600" : "!h-6 !w-6 text-gray-500"} />
                      <span className="font-medium">{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>

        <div className="mt-auto px-3 pb-4">
          <div className="flex items-center gap-3 rounded-md p-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[#031b4e]">
                {session?.user?.name ?? "Guest"}
              </div>
              <div className="truncate text-xs text-gray-500">
                {session?.user?.email ?? ""}
              </div>
            </div>
          </div>
        </div>

      </SidebarContent>
    </Sidebar>
  );
}
