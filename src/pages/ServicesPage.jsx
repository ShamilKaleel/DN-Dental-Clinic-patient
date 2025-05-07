import { ServicesBanner } from "../assets/index";
import Services from "../components/Services";
import Faq from "../components/Faq";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ServicesPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {/* Banner Section with animated title */}
      <motion.section
        className="mt-[92px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden">
          {/* Page title overlaid on banner image */}
          <motion.div
            className={`absolute top-1/3 w-full text-primary text-5xl font-bold text-center ${
              imageLoaded ? "z-10" : "z-0"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            Services we provide
          </motion.div>

          {/* Banner image with scale animation */}
          <motion.img
            src={ServicesBanner}
            alt="Services banner"
            className="h-[258px] w-full object-cover mx-auto" // Fixed height, full width, centered
            initial={{ scale: 1.1 }} // Start slightly zoomed in
            animate={{ scale: 1 }} // Animate to normal scale
            transition={{ duration: 1.2 }} // Over 1.2 seconds
            onLoad={() => setImageLoaded(true)} // Set image as loaded when it completes loading
            style={{
              opacity: imageLoaded ? 1 : 0, // Only show image once loaded
              transition: "opacity 0.5s ease-in-out", // Smooth opacity transition
            }}
          />
        </div>
      </motion.section>

      {/* Services Section - using the Services component */}
      <motion.section
        className="mt-24 px-5" // Margin top and horizontal padding
        initial={{ opacity: 0, y: 40 }} // Start below final position and invisible
        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
        viewport={{ once: true, margin: "-100px" }} // Only animate once, with viewport margin
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 70, // Lighter spring for smoother animation
        }}
      >
        <Services /> {/* Services component displays service cards */}
      </motion.section>

      {/* FAQ Section - using the Faq component */}
      <motion.section
        className="mt-32 px-5" // Larger margin top to separate from services
        initial={{ opacity: 0, y: 40 }} // Start below final position and invisible
        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
        viewport={{ once: true, margin: "-100px" }} // Only animate once, with viewport margin
        transition={{
          duration: 0.7,
          delay: 0.2, // Slight delay for staggered animation after services
          type: "spring",
          stiffness: 70,
        }}
      >
        <Faq /> {/* FAQ component with collapsible questions and answers */}
      </motion.section>
    </>
  );
}
