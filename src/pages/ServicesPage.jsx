import { ServicesBanner } from "../assets/index";
import Services from "../components/Services";
import Faq from "../components/Faq";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <>
      <motion.section
        className="mt-[92px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative  overflow-hidden">
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
            Services we provide
          </motion.div>
          <motion.img
            src={ServicesBanner}
            alt="description of the image"
            className="h-[258px] w-full object-cover mx-auto bg-slate-500"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
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
