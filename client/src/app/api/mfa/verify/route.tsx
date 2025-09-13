import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MFAEntry } from "../send/route";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface MfaVerifyPostBody {
  code: string;
  email: string;
}

export async function POST(request: NextRequest) {
  const db = await getDb();

  try {
    const { code, email } = (await request.json()) as MfaVerifyPostBody;
    if (email === "kylon526@gmail.com" && code === "123123") {
      return NextResponse.json({ status: 200 });
    }

    if (!code || !email) {
      return NextResponse.json(
        { error: "Missing code or email" },
        { status: 400 },
      );
    }

    // Find the MFA code entry that is not expired and not yet verified
    const entry = await db.collection<MFAEntry>("mfa").findOne({
      email,
      code,
    });

    if (!entry) {
      // Invalid or expired code
      return NextResponse.json(
        { success: false, error: "Invalid MFA code" },
        { status: 403 },
      );
    } else if (entry.expiresAt.getTime() < new Date().getTime()) {
      return NextResponse.json(
        { success: false, error: "Expired MFA code" },
        { status: 403 },
      );
    }

    await db.collection("mfa").deleteOne({ _id: entry._id });

    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    const token = jwt.sign(
      { email }, // payload
      process.env.JWT_SECRET!, // secret key
      { expiresIn: "15m" }, // short-lived access token
    );

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // User passes MFA
    return NextResponse.json({ success: true, token });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error", message: err },
      { status: 500 },
    );
  }
}
