"use server"

import { Resend } from "resend"
import { redirect } from "next/navigation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeUser(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    throw new Error("Email is required")
  }

  try {
    // Send notification email to you
    await resend.emails.send({
      from: "noreply@resend.dev", // You can change this to your domain once verified
      to: "rdeathbed@gmail.com",
      subject: "Someone subscribed to your website",
      html: `
        <h2>New Subscription Alert!</h2>
        <p>Someone just subscribed to your Nexa Beta website.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    })

    console.log("[v0] Subscription email sent successfully for:", email)
  } catch (error) {
    console.error("[v0] Failed to send subscription notification:", error)
    throw new Error("Failed to process subscription")
  }

  // Redirect to a success page or back to home with success message
  redirect("/?subscribed=true")
}
