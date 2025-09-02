// src/app/login/layout.tsx
// import FeatureList from "../login/_components/features/FeatureList";
import { FolderCode } from "lucide-react";
import React from "react";
import FeatureList from "./_components/features/FeatureList";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">

      {/* العمود الشمال */}
      <div className="flex-1 flex flex-col justify-between px-10 py-8 
                bg-gradient-to-b from-[#F6FAFF] via-[#EEF5FF] to-[#E6F0FF] 
                backdrop-blur-3xl">
        <div className="flex-1 mx-auto flex flex-col py-8">
          {/* هيدر */}
          <div className="flex items-center gap-2">
            <FolderCode className="w-10 h-10 text-blue-600" />
            <h1 className="text-xl font-bold">Exam App</h1>
          </div>

          {/* المميزات */}
          <div className="flex-1 flex flex-col justify-center pb-24">
            <FeatureList />
          </div>
        </div>
      </div>


      {/* العمود اليمين (متغير) */}
      <div className="flex-1 flex flex-col p-6 sm:p-10 bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}


{/* <div className="bg-yellow-500 mx-auto flex flex-col gap-12">
          {/* هيدر */}
// <div className="flex bg-blue-500 items-center gap-2">
//   <FolderCode className="w-10 h-10 text-blue-600" />
//   <h1 className="text-xl font-bold">Exam App</h1>
// </div>

{/* المميزات */ }
// <div className="flex-1 flex items-center">
//   <FeatureList />
// </div>
// </div>