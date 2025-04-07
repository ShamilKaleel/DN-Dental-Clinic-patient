import { HiCheck } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axiosInstance from "../api/axiosInstance";
import { FaFileArrowDown } from "react-icons/fa6";
import generateBookingPDF from "../utils/PDFGenerator";

export default function ConfirmationPage() {
  const { id, contactNumber } = useParams();

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get(
          `/bookings/${id}/${contactNumber}`
        );
        if (response.status === 200) {
          setBooking(response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(err.response.data.details.error);
        } else {
          setError("Error fetching booking data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleDownloadPDF = () => {
    generateBookingPDF(booking);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[92px] h-[500px]">
        <div className="h-[258px] w-full flex justify-center bg-primary relative px-5  ">
          <div className=" absolute top-1/4 md:top-1/3  flex flex-col gap-10 min-w">
            <div className=" rounded-3xl bg-white w-full sm:min-w-[400px] min-w-[350px] px-5">
              <div className=" mx-auto relative pt-10 pb-7 flex justify-center items-center   ">
                <div className=" absolute animate-ping  bg-green-400  p-5 rounded-full"></div>
                <span className="flex p-3  rounded-full bg-green-600  ">
                  <HiCheck className="text-3xl text-white   " />
                </span>
              </div>
              <div className="text-center text-gray-500 pb-3">Success! </div>
              <div className="text-center text-2xl text-black font-semibold pb-3 "></div>
              <div className="w-full border-b border-gray-200"></div>
              <div className="p-5">
                <ul className="flex flex-col gap-3 pb-5">
                  <li className="flex justify-between">
                    <div className="text-gray-500">Ref Number</div>
                    <div className="text-black font-semibold">
                      {booking.referenceId}
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Patient Name</div>
                    <div className="text-black font-semibold">
                      {booking.name}
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">NIC</div>
                    <div className="text-black font-semibold">
                      {booking.nic}
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Contact number</div>
                    <div className="text-black font-semibold">
                      {booking.contactNumber}
                    </div>
                  </li>

                  <li className="flex justify-between">
                    <div className="text-gray-500">Doctor's Name</div>
                    <div className="text-black font-semibold">
                      {booking.doctorName}
                    </div>
                  </li>

                  <li className="flex justify-between">
                    <div className="text-gray-500">Schedule Date </div>
                    <div className="text-black font-semibold">
                      {booking.scheduleDate}
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Schedule Time </div>
                    <div className="text-black font-semibold">
                      {booking.scheduleStartTime}
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Appointment Number </div>
                    <div className="text-black font-semibold">
                      {booking.appointmentNumber}
                    </div>
                  </li>
                </ul>
                <button
                  onClick={handleDownloadPDF}
                  className="flex gap-1 items-center justify-center w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                >
                  <FaFileArrowDown />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
