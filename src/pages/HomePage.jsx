import FeedbackBanner from "../components/FeedbackBanner";
import FeedbackForm from "../components/FeedbackForm";
import Hero from "../components/Hero";
import ResultBar from "../components/ResultBar";
import Services from "../components/Services";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Location from "../components/Location";
import SuccessMessage from "../components/SuccessMessage";
import { motion } from "framer-motion";
import ImageGallery from "../components/ImageGallery";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setShowForm(false); // First close the form
    setIsSubmitted(true); // Then show success message

    // Automatically hide the success message after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  // Prevent background scrolling when form is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  return (
    <>
      <motion.section
        className="mt-24 px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.section>

      <motion.section
        className="px-5 xl:px-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ResultBar />
      </motion.section>

      {/* Image Gallery Section - Full Width */}
      <motion.section
        className="mt-24 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageGallery />
      </motion.section>

      <motion.section
        className="mt-24 px-5 flex flex-col gap-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="font-semibold text-primary text-center text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Services we provide{" "}
        </motion.h1>
        <Services />
      </motion.section>

      <motion.section
        className="mt-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <FeedbackBanner setShowForm={setShowForm} />
      </motion.section>

      {/* Success message without animations */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <SuccessMessage />
        </div>
      )}

      {/* Feedback form without animations */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <FeedbackForm
            onClose={() => setShowForm(false)}
            onFormSubmit={handleFormSubmit}
          />
        </div>
      )}

      <motion.section
        className="mt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Location />
      </motion.section>
    </>
  );
}
