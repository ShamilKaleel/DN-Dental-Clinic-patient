import { Link } from "react-router-dom";
import { services } from "../data/index";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="w-full max-w-screen-xl m-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="flex flex-col bg-white h-full rounded-3xl p-5 relative shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.15, // Stagger the animations based on index
          }}
        >
          <motion.img
            src={service.image}
            alt=""
            className="aspect-3/2 bg-slate-400 rounded-xl object-cover"
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
          />
          <div className="flex flex-col flex-grow">
            <motion.h2
              className="text-xl px-5 pt-1 font-semibold mt-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
            >
              {service.name}
            </motion.h2>
            <motion.p
              className="text-gray-500 px-5 pt-3 mt-2 flex-grow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
            >
              {service.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
