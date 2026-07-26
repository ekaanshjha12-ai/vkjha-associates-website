import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";

const bookingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  company: z.string().trim().max(200).optional(),
  service: z.string().trim().min(1, "Service is required").max(200),
  preferredDate: z.string().trim().min(1, "Preferred date is required"),
  preferredTime: z.string().trim().min(1, "Preferred time is required"),
  meetingMode: z.enum(["online", "offline"]),
  notes: z.string().trim().max(2000).optional(),
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to book a consultation." },
      { status: 401 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
      { status: 400 }
    );
  }

  const {
    fullName,
    email,
    phone,
    company,
    service,
    preferredDate,
    preferredTime,
    meetingMode,
    notes,
  } = parsed.data;

  const { data: booking, error: dbError } = await supabase
    .from("bookings")
    .insert({
      client_id: user.id,
      full_name: fullName,
      email,
      phone,
      company: company || null,
      service,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      meeting_mode: meetingMode,
      notes: notes || null,
    })
    .select("id, booking_id")
    .single();

  if (dbError || !booking) {
    console.error("[bookings] Failed to create booking:", dbError);
    return NextResponse.json(
      { error: "Could not create the booking right now. Please try again shortly." },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[bookings] RESEND_API_KEY is not set — skipping booking notification email.",
      { bookingId: booking.booking_id, fullName, email, service }
    );
    return NextResponse.json({ ok: true, id: booking.id });
  }

  try {
    const resend = new Resend(apiKey);
    const { error: emailError } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: siteConfig.contact.bookingNotificationEmail,
      replyTo: email,
      subject: `New consultation booking — ${fullName} (${service})`,
      text: [
        `Booking ID: ${booking.booking_id}`,
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company || "-"}`,
        `Service: ${service}`,
        `Preferred Date & Time: ${formatDate(preferredDate)} · ${preferredTime}`,
        `Meeting Mode: ${meetingMode === "online" ? "Online" : "In-person"}`,
        "",
        "Notes:",
        notes || "-",
        "",
        `Manage this booking: ${siteConfig.url}/admin/bookings/${booking.id}`,
      ].join("\n"),
    });

    if (emailError) {
      console.error("[bookings] Resend error:", emailError);
    }
  } catch (err) {
    console.error("[bookings] Unexpected email error:", err);
  }

  return NextResponse.json({ ok: true, id: booking.id });
}
