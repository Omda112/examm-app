// app/account/layout.tsx
import type { ReactNode } from "react";
import { AccountInnerSidebar } from "./_components/account-sidebar"; 
import { Button } from "@/components/ui/button";
import { ChevronLeft, User } from "lucide-react";
import Link from "next/link";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-6">
      <div >

        {/* ===== Body: sidebar (left) + content (right) ===== */}
        <div className="grid grid-cols-[240px_1fr]">
          <AccountInnerSidebar />
          <section className="px-6">
            <div className="bg-white p-0">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
