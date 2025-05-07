import FeedbackBanner from "../components/FeedbackBanner";
import FeedbackForm from "../components/FeedbackForm";
import Hero from "../components/Hero";
import ResultBar from "../components/ResultBar";
import Services from "../components/Services";
import EnhancedTestimonialSlider from "../components/TestimonialSlider"; // Import the new component
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Location from "../components/Location";
import SuccessMessage from "../components/SuccessMessage";
import { motion } from "framer-motion";
import ImageGallery from "../components/ImageGallery";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleFormSubmit = () => {
    setShowForm(false); // First close the form
    setSuccessVisible(true); // Show success message
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

      {/* New Testimonial Component */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <EnhancedTestimonialSlider />
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
        className="mt-24 px-5 flex flex-col gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-block mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium inline-block">
              Dental Excellence
            </div>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Specialized Services
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our comprehensive range of dental treatments designed with
            your comfort and health in mind. Our expert team uses the latest
            technology to deliver exceptional care.
          </motion.p>
        </div>
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

      {/* Success message */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none ${
          successVisible ? "bg-black bg-opacity-50" : ""
        }`}
      >
        <SuccessMessage
          isVisible={successVisible}
          duration={3000}
          onClose={() => setSuccessVisible(false)}
        />
      </div>

      {/* Feedback form */}
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
