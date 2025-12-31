"use client";

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LogOut, Lock, UserRound, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

type Tab = "profile" | "password";

export function AccountInnerSidebar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();
  const tab = (search.get("tab") as Tab) ?? "profile";

  const goTab = (t: Tab, after?: () => void) => {
    const params = new URLSearchParams(search);
    params.set("tab", t);
    router.replace(`${pathname}?${params.toString()}`);
    if (after) after();
  };

  const Item = ({
    active,
    icon: Icon,
    label,
    onClick,
  }: {
    active?: boolean;
    icon: any;
    label: string;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition border",
        active
          ? "bg-white text-blue-700 border-blue-200 shadow-sm"
          : "bg-transparent text-gray-700 border-transparent hover:bg-white hover:text-gray-900",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        className={active ? "h-4 w-4 text-blue-600" : "h-4 w-4 text-gray-500"}
      />
      <span className="font-medium">{label}</span>
    </button>
  );

  const SidebarContent = ({
    onAfterAction,
  }: {
    onAfterAction?: () => void;
  }) => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Account
        </div>

        <div className="space-y-2">
          <Item
            active={tab === "profile"}
            icon={UserRound}
            label="Profile"
            onClick={() => goTab("profile", onAfterAction)}
          />
          <Item
            active={tab === "password"}
            icon={Lock}
            label="Change Password"
            onClick={() => goTab("password", onAfterAction)}
          />
        </div>
      </div>

      {/* Logout pinned bottom */}
      <div className="mt-auto p-4 pt-0">
        <Button
          onClick={async () => {
            if (onAfterAction) onAfterAction();
            await signOut({ callbackUrl: "/" });
          }}
          className="bg-red-50 w-full rounded-none text-red-800 flex justify-start gap-2 hover:bg-red-800 hover:text-white"
        >
          <LogOut className="!w-6 !h-6" />
          <span className="font-normal text-base">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden mb-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm"
        >
          <Menu className="h-4 w-4" />
          <span>Account menu</span>
        </button>
      </div>

      <aside className="hidden md:flex bg-white flex-col border-r border-gray-100">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-64 max-w-[80%] bg-white shadow-xl">
            <div className="flex items-center justify-between p-3 border-b">
              <span className="text-sm font-medium">Account</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <SidebarContent onAfterAction={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
