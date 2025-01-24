import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaEdit } from "react-icons/fa";
import CryptoJS from "crypto-js";
// Define validation schema with Zod
const bookingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name should be less than 40 characters"),
  nic: z
    .string()
    .regex(/^(\d{9}[VX]|[1-9]\d{11})$/, "Please enter a valid NIC number")
    .min(10, "NIC number should be 10 characters")
    .max(12, "NIC number should be 12 characters"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

export default function BookingForm({ scheduleId, setIsLoading, setError }) {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      nic: "",
      contactNumber: "",
      email: "",
      address: "",
    },
  });

  const formData = watch();

  const toggleBookingFormEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/bookings/create", {
        ...data,
        scheduleId,
      });

      if (response.status === 201) {
        navigate(
          `/booking/submit/${response.data.referenceId}/${response.data.contactNumber}`
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isEdit && (
        <div className="flex justify-center py-10 px-5 bg-white shadow-lg">
          <div className="xl:px-8 rounded-lg w-full max-w-screen-lg">
            <h2 className="text-center text-2xl font-semibold mb-10">
              Consult with Our Experts
            </h2>

            <form
              onSubmit={handleSubmit(toggleBookingFormEdit)}
              className="flex flex-col md:gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="nic" className="block text-sm font-medium">
                    NIC
                  </label>
                  <input
                    id="nic"
                    placeholder="Enter your NIC number"
                    {...register("nic")}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  {errors.nic && (
                    <p className="text-red-500 text-sm">{errors.nic.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium"
                  >
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    {...register("contactNumber")}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  placeholder="Enter your address"
                  id="address"
                  {...register("address")}
                  className="mt-1 block w-full border rounded-md p-2"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEdit && (
        <div className="w-full p-5 bg-white rounded-2xl">
          <ul className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Confirm Details</h2>
            <li>
              Name: <span className="font-semibold">{formData.name}</span>
            </li>
            <li>
              NIC: <span className="font-semibold">{formData.nic}</span>
            </li>
            <li>
              Contact Number:{" "}
              <span className="font-semibold">{formData.contactNumber}</span>
            </li>
            <li>
              Email: <span className="font-semibold">{formData.email}</span>
            </li>
            <li>
              Address: <span className="font-semibold">{formData.address}</span>
            </li>
          </ul>

          <div className="flex gap-5 mt-5">
            <button
              onClick={toggleBookingFormEdit}
              className="border px-5 py-2 rounded-md flex items-center gap-2"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-primary text-white px-5 py-2 rounded-md"
            >
              Confirm & Book
            </button>
          </div>
        </div>
      )}
    </>
  );
}
