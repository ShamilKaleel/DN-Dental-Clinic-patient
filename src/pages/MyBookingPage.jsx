import React, { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import axiosInstance from "../api/axiosInstance";
import jsPDF from "jspdf";
import { Logo } from "../assets/index";
import { set } from "zod";
import ButtonLording from "../components/ButtonLording";
import generateBookingPDF from "../utils/PDFGenerator";
export default function MyBookingPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    referenceNumber: "",
    phone: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    generateBookingPDF(responseData);
  };

  const dummyBookingDetails = {
    name: "John Doe",
    date: "2024-10-28",
    time: "10:00 AM",
    doctor: "Dr. Jane Smith",
    referenceNumber: "REF123456",
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
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/bookings/${referenceNumber}/${phone}`
        );
        setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors({
          ...errors,
          form:
            error.response.data.details.error ||
            "Failed to fetch booking details",
        });
      } finally {
        setIsLoading(false);
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
          {isLoading ? (
            <ButtonLording />
          ) : (
            <>
              <IoSearch />
              <span>Search</span>
            </>
          )}
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
      {responseData && !errors.form && (
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
                <div className="text-gray-500">Payment Method</div>
                <div className="text-black font-semibold">Bank Transfer</div>
              </li>

              <li className="flex justify-between">
                {/* <div className="text-gray-500">Schedule Date</div>
                <div className="text-black font-semibold">
                  {responseData.schedule.date}
                </div> */}
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
