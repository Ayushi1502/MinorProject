import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Log the message to the server console
    console.log('New contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST, // e.g., smtp.gmail.com
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10), // e.g., 587 for TLS, 465 for SSL
      secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER, // Your email address
        pass: process.env.EMAIL_SERVER_PASSWORD, // Your email password or app-specific password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER, // Sender address
      to: 'ayushiawasthi99073@gmail.com', // Recipient address
      subject: `Contact Form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact form submission or sending email:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
