import { ContactusBanner } from "../assets/index";
import ContactForm from "../components/ContactForm";
import Location from "../components/Location";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <>
      <motion.section
        className="mt-[92px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative bg-slate-300 overflow-hidden">
          <motion.div
            className="absolute top-1/3 w-full text-primary text-5xl font-bold text-center"
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
          <motion.img
            src={ContactusBanner}
            alt="description of the image"
            className="h-[258px] w-full object-cover mx-auto bg-slate-500"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ContactForm />
      </motion.section>

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
