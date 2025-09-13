import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete(process.env.JWT_REFRESH_COOKIE!);
  return NextResponse.json({});
}
