import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="container mx-auto text-center px-4">
      {/* Location Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-semibold text-primary text-center text-3xl lg:text-4xl">
          Location
        </h2>
        <p className="text-gray-600 mb-8">
          DN Dental Clinic, A4, Karaitivu 32250, Sri Lanka
        </p>
      </motion.div>

      {/* Google Map Embed */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="w-full lg:max-w-screen-xl md:max-w-screen-lg transform transition duration-500 hover:shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.727866654219!2d81.83724300978702!3d7.384363182668605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae53f9f8ce8e8b9%3A0x3907f53c6e29acae!2sDN%20Dental%20clinic!5e0!3m2!1sen!2slk!4v1744222964231!5m2!1sen!2slk"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            className="border-0 shadow-lg rounded-lg w-full xl:h-[500px] h-96"
            title="DN Dental Clinic Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
