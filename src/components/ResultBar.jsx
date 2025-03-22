import { motion } from "framer-motion";
import { Award, Users, HeartPulse, TrendingUp } from "lucide-react";

export default function ResultBar() {
  const data = [
    {
      value: "99%",
      title: "Satisfaction rate",
      icon: <Award className="text-teal-200 w-12 h-12" />,
      color: "from-teal-500 to-green-400",
    },
    {
      value: "15k",
      title: "Online Patients",
      icon: <Users className="text-blue-200 w-12 h-12" />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      value: "12k",
      title: "Patients Recovered",
      icon: <HeartPulse className="text-rose-200 w-12 h-12" />,
      color: "from-rose-500 to-pink-400",
    },
    {
      value: "240%",
      title: "Company growth",
      icon: <TrendingUp className="text-amber-200 w-12 h-12" />,
      color: "from-amber-500 to-orange-400",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-primary to-gray-800 py-16 relative overflow-hidden rounded-3xl">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500 blur-3xl"></div>
      </div>

      <motion.div
        className="w-full max-w-screen-xl m-auto text-white flex flex-col px-10  gap-20 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center">
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-sm font-medium text-teal-200">
              Proven Success
            </span>
          </motion.div>

          <motion.h2
            className="text-white text-3xl lg:text-5xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our results in numbers
          </motion.h2>

          <motion.p
            className="mt-4 text-gray-300 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're proud of the impact we've made on our patients' lives and the
            growth we've achieved together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-4 text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 * index,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient background that appears on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>

              {/* Icon container with animated background */}
              <motion.div
                className="relative mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + 0.15 * index,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                <div className="absolute inset-0 rounded-full bg-white/5 blur-xl"></div>
                {item.icon}
              </motion.div>

              <motion.h2
                className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + 0.15 * index,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                {item.value}
              </motion.h2>

              <motion.p
                className="font-medium text-lg text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + 0.15 * index,
                }}
              >
                {item.title}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
