// app/api/subjects/route.ts
// import { getToken } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";
// import { getToken } from "@/lib/utils/get-token";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  // const token = await getToken();
  const token = await getToken({req});
  console.log("token in proxy:", token);
  
  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const upstream = await fetch("https://exam.elevateegy.com/api/v1/subjects", {
    headers: { token: `${token.accessToken}` },
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: upstream.status });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
