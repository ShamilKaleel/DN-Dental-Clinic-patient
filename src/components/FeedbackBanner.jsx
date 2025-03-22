import { Pattern_down, Pattern_up } from "../assets/index";
import { motion } from "framer-motion";

export default function FeedbackBanner({ setShowForm }) {
  return (
    <>
      <div className="bg-primary text-white text-center py-3 relative w-full h-[500px] flex flex-col items-center justify-center gap-3">
        <motion.h1
          className="text-5xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Add your valuable
        </motion.h1>
        <motion.h1
          className="text-5xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          feedback
        </motion.h1>
        <motion.button
          onClick={() => setShowForm(true)}
          className="bg-btn-color text-black px-10 py-4 mt-5 z-20 hover:bg-opacity-90 transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Feedback
        </motion.button>

        <motion.img
          src={Pattern_down}
          alt=""
          className="absolute left-0 bottom-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src={Pattern_up}
          alt=""
          className="absolute right-0 top-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </>
  );
}
