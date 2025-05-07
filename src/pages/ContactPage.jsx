import { ContactusBanner } from "../assets/index";
import ContactForm from "../components/ContactForm";
import Location from "../components/Location";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {/* Banner section with animation and loading state management */}
      <motion.section
        className="mt-[92px]" // Margin top to account for fixed header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden">
          {/* Loading placeholder - shows when image is loading */}

          {/* Page title with conditional z-index based on image loading */}
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
            Contact Us
          </motion.div>

          {/* Banner image with loading detection */}
          <motion.img
            src={ContactusBanner}
            alt="Contact us banner"
            className="h-[258px] w-full object-cover mx-auto"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            onLoad={() => setImageLoaded(true)}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </div>
      </motion.section>

      {/* Contact form section with animation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ContactForm />
      </motion.section>

      {/* Location section with animation */}
      <motion.section
        className="mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Location />
      </motion.section>
    </>
  );
}
