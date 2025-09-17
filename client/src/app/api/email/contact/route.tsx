import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

interface ResendPostBody {
  email: string;
  name: string;
  message: string;
  linkedIn: string;
}

export interface MFAEntry {
  _id: ObjectId;
  email: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}

export async function POST(req: NextRequest) {
  const { email, name, message, linkedIn } =
    (await req.json()) as ResendPostBody;
  const db = await getDb();

  const { data, error } = await resend.emails.send({
    from: "Yori Hiring <contact@resend.dev>",
    to: "kylon526@gmail.com",
    subject: "Somebody wants to hire you",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="color: #0070f3;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedIn}" target="_blank">${linkedIn}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line; padding: 0.5rem; background: #f5f5f5; border-radius: 6px;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ received: data });
}
