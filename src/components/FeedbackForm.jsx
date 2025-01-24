import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../api/axiosInstance";

// Zod schema for validation
const feedbackSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .max(40, "Name should be less than 40 characters"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1, "Rating is required").max(5, "Invalid rating"),
  comments: z.string().optional(),
});

export default function FeedbackForm({ onClose, onFormSubmit }) {
  const FeedbackRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const rating = watch("rating");

  const closeForm = (e) => {
    if (e.target === FeedbackRef.current) {
      onClose();
    }
  };

  const onSubmit = async (data) => {
    console.log("Validated Data:", data);
    try {
      const response = await axiosInstance.post("/feedback/submit", data);
      if (response.status === 201) {
        console.log("Feedback submitted successfully", data);
        onFormSubmit(); // Trigger the form submit handler to show success message and close modal
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error(
        "Error submitting feedback:",
        error.response?.data?.error ?? null
      );
    } finally {
      onClose();
    }
  };

  return (
    <div
      ref={FeedbackRef}
      onClick={closeForm}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed flex items-center justify-center h-screen w-full z-30"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white min-w-[350px] lg:min-w-[400px] mx-auto mt-10 p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Feedback Form</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1; // Determine the current star's value
              return (
                <label key={index} className="cursor-pointer">
                  {/* Hidden input for React Hook Form */}
                  <input
                    type="radio"
                    value={ratingValue}
                    {...register("rating", { valueAsNumber: true })}
                    className="hidden"
                    onChange={() => setValue("rating", ratingValue)} // Set value on change
                  />
                  <FaStar
                    size={30}
                    color={ratingValue <= (rating || 0) ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setValue("rating", ratingValue)} // Update value on click
                  />
                </label>
              );
            })}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="comments"
          >
            Add Comment:
          </label>
          <textarea
            id="comments"
            {...register("comments")}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Optional"
          />
        </div>

        <div className="text-center flex justify-end gap-5">
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-gray-400 duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-primary text-white font-semibold rounded hover:bg-green-800 duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
