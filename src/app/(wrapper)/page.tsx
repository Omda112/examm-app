import { authOptions } from "@/auth";
import { getServerToken } from "@/lib/utils/get-token";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DiplomaCard from "@/components/diplomas/diploma-card";
import { cookies } from "next/headers";
import { GraduationCap } from "lucide-react";
import HeaderBar from "@/components/header-bar";


export default async function Home() {

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const cookieHeader = cookies().getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const res = await fetch("http://localhost:3000/api/subjects", {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });
  const diplomas = await res.json();
  console.log(diplomas);
  
  const token = await getServerToken();
  console.log("token from page.tsx", token);
  
  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/\-+/g, "-")
      .replace(/^\-+|\-+$/g, "");
  }



  // const session = await getServerSession(authOptions);

  return (
        

    <div className="grid W-full  min-h-screen  pb-20 ">
      <main className="flex flex-col w-full px-6">
      <HeaderBar title="Diplomas" />
        <div className="mx-auto w-full py-0">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diplomas.subjects.map(
              (d: { _id: string; name: string; icon: string }) => {
                const slug = slugify(d.name);
                const href = `/diplomas/${slug}-${d._id}/exams`; 
                return (
                  <DiplomaCard
                    key={d._id}
                    title={d.name}
                    img={d.icon}
                    href={href}
                  />
                );
              }
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
