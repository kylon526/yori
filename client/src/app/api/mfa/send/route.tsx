import { MFATemplate } from "@/components/emails/MFATemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

interface ResendPostBody {
  to: string;
  code: string;
}

export interface MFAEntry {
  _id: ObjectId;
  email: string; // or sessionId if user isn't logged in
  code: string;
  createdAt: Date;
  expiresAt: Date; // e.g., 5 minutes later
}

export async function POST(req: NextRequest) {
  const { to, code } = (await req.json()) as ResendPostBody;

  const { data, error } = await resend.emails.send({
    from: "Yori <mfa@resend.dev>",
    to,
    subject: "Yori MFA Code",
    react: <MFATemplate code={code} />,
  });

  if (error) {
    return NextResponse.error();
  }

  db.collection<MFAEntry>("mfa").insertOne({
    _id: new ObjectId(),
    email: to,
    code,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  return NextResponse.json({ received: data });
}
