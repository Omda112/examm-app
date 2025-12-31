import type { ReactNode } from "react";
import AuthProvider from "@/context/auth.provider";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";


export const metadata = {
  title: "Exam App",
  description: "An app for managing and taking exams",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
  params: { slugId: string };
}) {
  return (
    <div>
      {/* Auth context */}
      <AuthProvider>
        {/* Sidebar context */}
        <SidebarProvider>
          <div className="mx-auto flex w-full min-h-screen">
            {/* Sidebar on the left */}
            <AppSidebar />

            {/* Main content area */}
            <div className="flex-1 bg-gray-50">
              {/* Breadcrumb navigation */}
              <nav
                aria-label="breadcrumb"
                className="p-4 border-b bg-white flex items-center gap-3"
              >
                {/* MOBILE SIDEBAR BUTTON */}
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>

                {/* Breadcrumb component */}
                <SiteBreadcrumb />
              </nav>

              <main className="min-h-[calc(100vh-140px)]">
                {/* Page content */}
                {children}

              </main>

              {/* Footer */}
              <footer className="bg-gray-100 text-center p-4 text-sm">
                © {new Date().getFullYear()} Exam App. All rights reserved.
              </footer>
            </div>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
