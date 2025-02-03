import nodemailer from "nodemailer";

const sendBookingConfirmation = async (userEmail, bookingDetails) => {
  try {
    // Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your App Password (Generate from Google)
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Booking Confirmation - UrbanHaven",
      html: `
        <h2>Your Booking is Confirmed!</h2>
        <p><strong>Hotel:</strong> ${bookingDetails.title}</p>
        <p><strong>Location:</strong> ${bookingDetails.city} , ${bookingDetails.state} , ${bookingDetails.country}</p>
        <p><strong>Check-in:</strong> ${bookingDetails.checkInDate}</p>
        <p><strong>Check-out:</strong> ${bookingDetails.checkOutDate}</p>
        <p><strong>Payment Method:</strong> ${bookingDetails.paymentDetails}</p>
        <p>Thank you for booking with UrbanHaven!</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent!");
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
  }
};

export {sendBookingConfirmation};
