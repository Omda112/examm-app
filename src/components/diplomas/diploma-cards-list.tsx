"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiplomaCard from "@/components/diplomas/diploma-card";
import { useMemo } from "react";

// دالة الفetch
async function fetchDiplomas({
  pageParam = 1,
  limit = 6,
}: {
  pageParam?: number;
  limit?: number;
}) {
  const res = await fetch(`/api/subjects?page=${pageParam}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch diplomas");
  return res.json();
}

// دالة slugify زي ما هي
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export default function DiplomaCardsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<DiplomaPageResponse, Error>({
    queryKey: ["diplomas"],
    queryFn: ({ pageParam }) =>
      fetchDiplomas({ pageParam: pageParam as number, limit: 6 }),
    getNextPageParam: (lastPage: DiplomaPageResponse) => {
      const { metadata } = lastPage;
      if (metadata.currentPage < metadata.numberOfPages) {
        return metadata.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const diplomas = useMemo(
    () => data?.pages.flatMap((page) => page.subjects) ?? [],
    [data]
  );

  if (status === "pending") return <div>جاري التحميل...</div>;
  if (status === "error")
    return <div>حدث خطأ: {(error as Error).message}</div>;

  return (
    <>
      {diplomas.map((d: Diploma) => {
        const slug = slugify(d.name);
        const href = `/diplomas/${slug}-${d._id}/exams`;
        return (
          <DiplomaCard key={d._id} title={d.name} img={d.icon} href={href} />
        );
      })}

      {hasNextPage && (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
        </button>
      )}
    </>
  );
}
