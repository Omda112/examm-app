export async function fetchDiplomas({
  pageParam = 1,
  limit = 6,
}: {
  pageParam?: number;
  limit?: number;
}) {
  const res = await fetch(
    `https://exam-app-back-iota.vercel.app/diplomas?page=${pageParam}&limit=${limit}`,
    {
      next: {
        revalidate: 60,
        tags: ["diplomas"],
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch diplomas");
  return res.json();
}
