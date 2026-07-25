import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { createAdminClient } from "@/lib/supabase/admin";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  company: z.string().trim().max(200).optional(),
  purpose: z.string().trim().min(1, "Purpose is required").max(100),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
      { status: 400 }
    );
  }

  const { fullName, email, phone, company, purpose, message } = parsed.data;

  const admin = createAdminClient();
  if (admin) {
    const { error: dbError } = await admin.from("contact_submissions").insert({
      full_name: fullName,
      email,
      phone,
      company_name: company || null,
      purpose,
      message,
      user_agent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for"),
    });
    if (dbError) {
      console.error("[contact] Failed to store submission in Supabase:", dbError);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — logging enquiry instead of emailing.",
      { fullName, email, phone, company, purpose, message }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: siteConfig.contact.enquiryEmail,
      replyTo: email,
      subject: `New enquiry from ${fullName} — ${purpose}`,
      text: [
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company || "-"}`,
        `Purpose: ${purpose}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your enquiry right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Could not send your enquiry right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
