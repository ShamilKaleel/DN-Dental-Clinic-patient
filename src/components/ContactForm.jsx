import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../api/axiosInstance";
import SuccessMessage from "../components/SuccessMessage";
// Define the Zod schema
const contactFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .max(40, "Name should be less than 40 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please provide a valid email address"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  subject: z.string().nonempty("Subject is required"),
  message: z
    .string()
    .nonempty("Message is required")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData);

    try {
      const response = await axiosInstance.post("/contacts/submit", formData);

      if (response.status === 201) {
        console.log("Feedback submitted successfully", formData);
        reset(); // Reset the form after successful submission
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.log("Error submitting feedback:", error.response);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-5 bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-screen-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Get In Touch
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                placeholder="Enter your first name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                {...register("contactNumber")}
                placeholder="Enter your contact number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                placeholder="Enter your subject"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows="4"
              placeholder="Type your message..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-teal-500"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
