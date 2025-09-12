import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Missing refresh token" },
        { status: 401 }
      );
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { email: (payload as any).email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid refresh token", err },
      { status: 403 }
    );
  }
}
