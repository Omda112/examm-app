import HeaderBar from "@/components/header-bar";
import DiplomaCardsList from "@/components/diplomas/diploma-cards-list";
import { fetchDiplomas } from "@/lib/apis/diplomas.api";

export default async function Home() {
  const allDiplomas = await fetchDiplomas({ pageParam: 1, limit: 1000 });

  return (
    <div className="grid w-full min-h-screen pb-20">
      <main className="flex flex-col w-full px-6">
        {/* Page header */}
        <HeaderBar title="Diplomas" />

        <div className="mx-auto w-full py-0">
          {/* Diplomas grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DiplomaCardsList allDiplomas={allDiplomas.subjects} />
          </section>
        </div>
      </main>
    </div>
  );
}
