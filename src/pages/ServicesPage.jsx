import { ServicesBanner } from "../assets/index";
import Services from "../components/Services";
import Faq from "../components/Faq";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ServicesPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <motion.section
        className="mt-[92px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}

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

          <motion.img
            src={ServicesBanner}
            alt="Services banner"
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

      <motion.section
        className="mt-24 px-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 70,
        }}
      >
        <Services />
      </motion.section>

      <motion.section
        className="mt-32 px-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          type: "spring",
          stiffness: 70,
        }}
      >
        <Faq />
      </motion.section>
    </>
  );
}
