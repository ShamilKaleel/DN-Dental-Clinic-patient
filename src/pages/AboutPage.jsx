import { AboutUs, Doctor } from "../assets/index";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutPage() {
  const [aboutUsImageLoaded, setAboutUsImageLoaded] = useState(false);
  const [doctorImageLoaded, setDoctorImageLoaded] = useState(false);

  return (
    <>
      <section className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mt-[120px] xl:mt-[150px] px-5">
        <div className="relative">
          {/* Loading placeholder for AboutUs image */}
          {!aboutUsImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}

          <motion.img
            src={AboutUs}
            alt="About DN Dental Clinic"
            className="rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onLoad={() => setAboutUsImageLoaded(true)}
            style={{
              opacity: aboutUsImageLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </div>

        <motion.div
          className="flex justify-center ml-10 flex-col gap-5 lg:items-start items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col gap-5">
            <motion.h2
              className="text-4xl font-bold sm:text-center lg:text-start"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              What you should know
            </motion.h2>
          </div>

          <motion.p
            className="sm:text-center leading-6 lg:text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Welcome to our "About" page! At DN Dental Clinic, we are dedicated
            to providing high-quality dental care in a comfortable and friendly
            environment. Our experienced team prioritizes patient satisfaction
            and continuous education to stay updated with the latest
            advancements in dental technology. Here, you can learn about our
            range of services, from routine check-ups to advanced cosmetic
            treatments, and discover our commitment to making dental care
            accessible for everyone. We look forward to helping you achieve a
            healthy, beautiful smile!
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="bg-primary mt-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-20 px-5">
          <motion.div
            className="flex flex-col gap-10 justify-center py-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Message from Our Doctor
            </motion.h1>
            <motion.p
              className="text-white leading-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to DN Dental Clinic! As your dedicated dental care
              provider, my primary goal is to ensure that every patient feels
              comfortable, informed, and confident in their dental health. We
              utilize the latest technology and techniques to deliver
              high-quality treatments, whether you need a routine check-up or
              specialized procedures. Our friendly staff is committed to
              creating a warm and welcoming environment, guiding you through
              every step of your dental journey. Thank you for trusting us with
              your care; together, let's achieve a healthy, beautiful smile that
              you can be proud of!
            </motion.p>
            <motion.p
              className="text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              — Umashankar, DN Dental Clinic
            </motion.p>
          </motion.div>
          <div className="flex justify-center relative">
            {/* Loading placeholder for Doctor image */}
            {!doctorImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-500">Loading...</span>
              </div>
            )}

            <motion.img
              src={Doctor}
              alt="DN Dental Clinic Doctor"
              className="lg:absolute lg:bottom-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              onLoad={() => setDoctorImageLoaded(true)}
              style={{
                opacity: doctorImageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
      </motion.section>
    </>
  );
}
