import FeedbackBanner from "../components/FeedbackBanner";
import FeedbackForm from "../components/FeedbackForm";
import Hero from "../components/Hero";
import ResultBar from "../components/ResultBar";
import Services from "../components/Services";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Location from "../components/Location";
import SuccessMessage from "../components/SuccessMessage";
import { motion, AnimatePresence } from "framer-motion";
export default function AnimatedHomePage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <motion.section
        className="mt-24 px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.section>

      <motion.section
        className="bg-primary px-5 mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ResultBar />
      </motion.section>

      <motion.section
        className="mt-24 px-5 flex flex-col gap-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <motion.h1
          className="font-semibold text-primary text-center text-3xl lg:text-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Services we provide
        </motion.h1>
        <Services />
      </motion.section>

      <motion.section
        className="mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <FeedbackBanner setShowForm={setShowForm} />
      </motion.section>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SuccessMessage />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackForm
              onClose={() => setShowForm(false)}
              onFormSubmit={handleFormSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Location />
      </motion.section>
    </>
  );
}
