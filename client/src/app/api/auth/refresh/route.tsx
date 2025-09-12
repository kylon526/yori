import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Missing refresh token" },
        { status: 401 },
      );
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as { email: string };

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { email: payload.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid refresh token", err },
      { status: 403 },
    );
  }
}
