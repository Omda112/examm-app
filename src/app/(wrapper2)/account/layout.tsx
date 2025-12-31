// app/account/layout.tsx
import type { ReactNode } from "react";
import { AccountInnerSidebar } from "./_components/account-sidebar";
import { UserRound } from "lucide-react";

import HeaderBar from "@/components/header-bar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="px-6">
      <div>
        <HeaderBar
          title="Account Settings"
          icon={<UserRound className="!h-9 !w-9" />}
        />
        {/* Body: sidebar (left) + content (right) */}
        <div className="mt-4 md:grid md:grid-cols-[240px_1fr] md:gap-6">
          <AccountInnerSidebar />
          <section>
            <div className="bg-white p-0">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
