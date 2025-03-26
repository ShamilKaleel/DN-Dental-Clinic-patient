import { Link } from "react-router-dom";
import { HeroImage } from "../assets/index";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full max-w-screen-xl m-auto pt-10 pb-16 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-teal-200/20 to-cyan-200/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute bottom-10 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-200/20 to-green-200/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Main content grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
        {/* Left column - Text content */}
        <div className="flex flex-col gap-3 lg:justify-center lg:items-start sm:items-center z-10">
          <motion.div
            className="mb-2 px-4 py-1 bg-teal-50 rounded-full border border-teal-200 inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm font-medium">
              Professional Dental Care
            </span>
          </motion.div>

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
            className="mt-5 text-lg text-gray-600 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Join our community of dental experts in a relaxed environment. Share
            knowledge, build connections, and advance your career.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/booking"
                className="bg-gradient-to-r from-[#007E85] to-[#00999f] text-white px-8 py-3 font-semibold rounded-lg text-center inline-block shadow-lg shadow-teal-200/50 hover:shadow-teal-300/50 transition-all"
              >
                Book Now
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/services"
                className="border-2 border-primary text-primary px-8 py-2.5 font-semibold rounded-lg text-center inline-block hover:bg-primary/5 transition-all"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-white bg-teal-${
                    i * 100
                  } flex items-center justify-center`}
                >
                  <span className="text-xs text-white font-bold">DN</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-primary">200+</span> dental
              professionals already registered
            </p>
          </motion.div>
        </div>

        {/* Right column - Image */}
        <motion.div
          className="flex justify-center items-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Decorative ring */}
            <motion.div
              className="absolute inset-0 border-8 border-teal-100 rounded-full -m-6"
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            {/* Main image with container */}
            <motion.div
              className="relative overflow-hidden rounded-3xl "
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={HeroImage}
                alt="DN Dental Clinic"
                className="object-cover"
              />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-6 right-6  rounded-lg px-4 py-2 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-800">
                    Appointments Available
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
