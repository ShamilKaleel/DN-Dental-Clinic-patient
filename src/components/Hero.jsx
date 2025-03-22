import { Link } from "react-router-dom";
import { HeroImage } from "../assets/index";
import { motion, AnimatePresence } from "framer-motion";
// Enhanced Hero Component with staggered animations
export default function Hero() {
  return (
    <section className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
      <div className="flex flex-col gap-3 lg:justify-center lg:items-start sm:items-center pt-10">
        <motion.h1
          className="sm:text-6xl text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007E85] to-[#5be066]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          DN Dental Clinic :
        </motion.h1>

        <motion.h1
          className="sm:text-6xl text-5xl font-bold text-text-headers"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A Casual Meetup for
        </motion.h1>

        <motion.h1
          className="sm:text-6xl text-5xl font-bold text-text-headers"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Dental Professionals
        </motion.h1>

        <motion.p
          className="mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Please register to be a part of the event.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/booking"
            className="bg-primary text-white px-8 py-2 font-semibold hover:opacity-80 transition-all rounded-lg text-center inline-block"
          >
            Book Now
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.img
          src={HeroImage}
          alt="DN Dental Clinic"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
    </section>
  );
}
