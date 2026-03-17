import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT_EMAIL = "onlisyn2025@gmail.com"

export async function POST(request: Request) {
  console.log("[v0] Contact API route hit")

  try {
    const data = await request.json()
    console.log("[v0] Received data:", JSON.stringify(data, null, 2))

    if (data.type === "general") {
      // General contact form
      const { name, email, subject, message } = data

      const { data: emailData, error } = await resend.emails.send({
        from: "Species Market <onboarding@resend.dev>",
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h1>New Contact Form Submission</h1>
          
          <h2>Contact Information</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          
          <h2>Message</h2>
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      })

      if (error) {
        console.error("[v0] Resend error:", error)
        return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 })
      }

      console.log("[v0] Email sent successfully:", emailData)
      return NextResponse.json({ success: true, message: "Message sent successfully" })
    }

    // Earlybird forward contract form
    const {
      fullName,
      email,
      phone,
      company,
      investorStatus,
      quantity,
      contractPrice,
      adminFee,
      totalPrice,
      marketValue,
      totalSavings,
    } = data

    console.log("[v0] Sending earlybird email via Resend...")

    const { data: emailData, error } = await resend.emails.send({
      from: "Species Market <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Forward Contract Request - ${fullName} - ${quantity.toLocaleString()} Specie`,
      html: `
        <h1>Forward Contract Request</h1>
        
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Company:</strong> ${company || "N/A"}</li>
          <li><strong>Investor Status:</strong> ${investorStatus}</li>
        </ul>
        
        <h2>Order Details</h2>
        <ul>
          <li><strong>Quantity:</strong> ${quantity.toLocaleString()} Specie units</li>
          <li><strong>Contract Price:</strong> $${contractPrice.toFixed(2)}</li>
          <li><strong>Admin Fee:</strong> $${adminFee.toFixed(2)}</li>
          <li><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</li>
          <li><strong>Market Value at $1.00:</strong> $${marketValue.toFixed(2)}</li>
          <li><strong>Total Savings:</strong> $${totalSavings.toFixed(2)}</li>
        </ul>
        
        <p><em>The individual has confirmed they have read and agreed to all terms.</em></p>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", emailData)

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to submit request" }, { status: 500 })
  }
}
