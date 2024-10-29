import React, { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import jsPDF from "jspdf";
import { Logo } from "../assets/index";

export default function MyBookingPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    referenceNumber: "",
    phone: "",
  });
  const [responseData, setResponseData] = useState(null);

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    generatePDF(responseData);
  };

  const dummyBookingDetails = {
    name: "John Doe",
    date: "2024-10-28",
    time: "10:00 AM",
    doctor: "Dr. Jane Smith",
    referenceNumber: "REF123456",
  };

  const generatePDF = (bookingDetails) => {
    const doc = new jsPDF();

    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString(); // Format the date as "MM/DD/YYYY" or according to locale
    const timeStr = currentDate.toLocaleTimeString(); // Format the time as "HH:MM:SS"

    // Add current date and time to the top of the page
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${dateStr}`, 20, 10);
    doc.text(`Time: ${timeStr}`, 160, 10); // Position on the right side

    const logoData = Logo; // Base64 string of your logo
    const logoWidth = 15; // Set your desired logo width
    const logoHeight = 15; // Set your desired logo height
    doc.addImage(logoData, "PNG", 62, 15, logoWidth, logoHeight); // Position the logo at (10, 10)

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 126, 133);
    const confirmationText1 = "DN Dental Clinic";
    const confirmationTextWidth1 = doc.getTextWidth(confirmationText1);
    const confirmationX1 =
      (doc.internal.pageSize.getWidth() - confirmationTextWidth1) / 2; // Calculate x for centering
    doc.text(confirmationText1, confirmationX1 + 7, 25); // Draw the centered text

    const lineY = 15 + logoHeight + 5; // Y position for the line, 5 units below the logo
    doc.line(10, lineY, 200, lineY); // Draw the line from x=10 to x=200 at y=lineY

    doc.setTextColor(0, 0, 0); // RGB for red
    // Bold the "Booking Confirmation" text
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const confirmationText = "Booking Confirmation";
    const confirmationTextWidth = doc.getTextWidth(confirmationText);
    const confirmationX =
      (doc.internal.pageSize.getWidth() - confirmationTextWidth) / 2; // Calculate x for centering
    doc.text(confirmationText, confirmationX, 48); // Draw the centered text

    // Reset font to normal for other details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Booking details
    doc.text(`Reference Number `, 20, 65);
    doc.text(`:    ${bookingDetails.referenceId}`, 60, 65);
    doc.text(`Sender Name`, 20, 75);
    doc.text(`:    ${bookingDetails.name}`, 60, 75);
    doc.text(`Nic`, 20, 85);
    doc.text(`:    ${bookingDetails.nic}`, 60, 85);
    doc.text(`Contact Number`, 20, 95);
    doc.text(`:    ${bookingDetails.contactNumber}`, 60, 95);
    doc.text(`Email`, 20, 105);
    doc.text(`:    ${bookingDetails.email}`, 60, 105);
    doc.text(`Payment Time`, 20, 115);
    doc.text(`:    ${bookingDetails.email}`, 60, 115);
    doc.text(`Payment Method`, 20, 125);
    doc.text(`:    Bank Transfer`, 60, 125);
    doc.text(`Schedule Date`, 20, 135);
    doc.text(`:    ${bookingDetails.schedule.date}`, 60, 135);
    doc.save("booking_confirmation.pdf");
  };

  // Handle input changes for each field
  const handleReferenceNumberChange = (e) => {
    setReferenceNumber(e.target.value);
    if (errors.referenceNumber) {
      setErrors({ ...errors, referenceNumber: "" }); // Clear error when user starts typing
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!referenceNumber) {
      formIsValid = false;
      newErrors.referenceNumber = "Reference Number is required";
    }

    if (!phone) {
      formIsValid = false;
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      formIsValid = false;
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/bookings/${referenceNumber}?phone=${phone}`
        );

        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors({
          ...errors,
          form: "There is no booking",
        });
      }
    }
  };

  return (
    <div className="mt-[95px] md:mt-[150px] w-full max-w-xs md:max-w-lg mx-auto bg-white p-3 md:p-8 border rounded-lg shadow-md">
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 pl-2">
            Search Booking
          </h2>
          <label className="flex items-center space-x-2">
            <FaUser />
            <input
              type="text"
              value={referenceNumber}
              onChange={handleReferenceNumberChange}
              placeholder="Reference Number - Required"
              className="w-full border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-600"
            />
          </label>
          {errors.referenceNumber && (
            <p className="pl-5 text-red-500 text-sm">
              {errors.referenceNumber}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <FaPhoneAlt />
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone - Required"
              className="w-full border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-600"
            />
          </label>
          {errors.phone && (
            <p className="pl-5 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded flex items-center justify-center space-x-2"
        >
          <IoSearch />
          <span>Search</span>
        </button>
        {errors.form && (
          <p className="text-red-500 text-sm mt-4">{errors.form}</p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          <p className="">
            *Please use the local phone number entered under patient’s details.
            This feature is not available for foreign numbers.
          </p>
        </div>
      </form>
      {responseData && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-primary font-bold">Booking details</h3>
          <pre className="text-sm text-gray-700">
            <ul className="flex flex-col gap-3 pb-5 mt-5">
              <li className="flex justify-between">
                <div className="text-gray-500">Ref Number</div>
                <div className="text-black font-semibold">
                  {responseData.referenceId}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Sender Name</div>
                <div className="text-black font-semibold">
                  {responseData.name}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Nic</div>
                <div className="text-black font-semibold">
                  {responseData.nic}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Contact Number</div>
                <div className="text-black font-semibold">
                  {responseData.contactNumber}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Email</div>
                <div className="text-black font-semibold">
                  {responseData.email}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Payment Time</div>
                <div className="text-black font-semibold">
                  {responseData.dateTime}
                </div>
              </li>
              <li className="flex justify-between">
                <div className="text-gray-500">Payment Method</div>
                <div className="text-black font-semibold">Bank Transfer</div>
              </li>

              <li className="flex justify-between">
                <div className="text-gray-500">Schedule Date</div>
                <div className="text-black font-semibold">
                  {responseData.schedule.date}
                </div>
              </li>
            </ul>
          </pre>
          <button
            onClick={handleDownloadPDF}
            className="flex gap-1 hover:text-primary du"
          >
            <FaFileArrowDown />
            <span>Download pdf</span>
          </button>
        </div>
      )}
    </div>
  );
}
