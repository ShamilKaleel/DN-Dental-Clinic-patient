// src/utils/PDFGenerator.js

import jsPDF from "jspdf";
import { Logo } from "../assets/index";

export const generateBookingPDF = (bookingDetails) => {
  const doc = new jsPDF();
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString();
  const timeStr = currentDate.toLocaleTimeString();

  // Header with teal background
  doc.setFillColor(0, 126, 133); // Teal color
  doc.rect(0, 0, 210, 14, "F"); // Rectangle width adjusted for A4 size paper

  // Date and Time in header
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${dateStr}`, 20, 8);
  doc.text(`Time: ${timeStr}`, 180, 8, { align: "right" });

  // Logo
  const logoData = Logo; // Base64 string of your logo
  const logoWidth = 15; // Set your desired logo width
  const logoHeight = 15; // Set your desired logo height
  doc.addImage(logoData, "PNG", 62, 15 + 2, logoWidth, logoHeight);

  // Clinic name
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 126, 133);
  const confirmationText1 = "DN Dental Clinic";
  const confirmationTextWidth1 = doc.getTextWidth(confirmationText1);
  const confirmationX1 =
    (doc.internal.pageSize.getWidth() - confirmationTextWidth1) / 2;
  doc.text(confirmationText1, confirmationX1 + 7, 25 + 3);

  // Separator line
  const lineY = 15 + logoHeight + 5;
  doc.line(10, lineY, 200, lineY);

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  const confirmationText = "Booking Confirmation";
  const confirmationTextWidth = doc.getTextWidth(confirmationText);
  const confirmationX =
    (doc.internal.pageSize.getWidth() - confirmationTextWidth) / 2;
  doc.text(confirmationText, confirmationX, 48);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Reference Number`, 20, 65);
  doc.text(`: ${bookingDetails.referenceId}`, 80, 65);

  doc.text(`Patient Name`, 20, 75);
  doc.text(`: ${bookingDetails.name}`, 80, 75);

  doc.text(`NIC`, 20, 85);
  doc.text(`: ${bookingDetails.nic}`, 80, 85);

  doc.text(`Contact Number`, 20, 95);
  doc.text(`: ${bookingDetails.contactNumber}`, 80, 95);

  doc.text(`Email`, 20, 105);
  doc.text(`: ${bookingDetails.email || "N/A"}`, 80, 105);

  doc.text(`Address`, 20, 115);
  doc.text(`: ${bookingDetails.address || "N/A"}`, 80, 115);

  // Appointment Details
  doc.text(`Doctor Name`, 20, 125);
  doc.text(`: ${bookingDetails.doctorName || "Dr. Kristina Castle"}`, 80, 125);

  doc.text(`Schedule Date`, 20, 135);
  doc.text(
    `: ${bookingDetails.scheduleDate || bookingDetails.date || "N/A"}`,
    80,
    135
  );

  doc.text(`Schedule Day of Week`, 20, 145);
  doc.text(
    `: ${
      bookingDetails.scheduleDayOfWeek || bookingDetails.dayOfWeek || "N/A"
    }`,
    80,
    145
  );

  doc.text(`Schedule Start Time`, 20, 155);
  doc.text(
    `: ${
      bookingDetails.scheduleStartTime || bookingDetails.startTime || "N/A"
    }`,
    80,
    155
  );

  doc.text(`Appointment Number`, 20, 165);
  doc.text(`: ${bookingDetails.appointmentNumber || "N/A"}`, 80, 165);

  // Footer
  doc.setFillColor(0, 126, 133); // Teal color
  doc.rect(0, 285, 210, 300, "F");

  doc.setTextColor(0, 126, 133);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Terms and Conditions: https://www.DNDentalclinic.com/terms-and-conditions",
    105,
    280,
    { align: "center" }
  );

  doc.setTextColor(255, 255, 255);
  doc.text("Wishing you Good Health!", 105, 290 + 2, { align: "center" });

  // Save PDF
  doc.save("booking-confirmation.pdf");
};

export default generateBookingPDF;
