import { AboutUs, Doctor } from "../assets/index";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, Award, Heart, Clock, Users, Star } from "lucide-react";

export default function AboutPage() {
  const [aboutUsImageLoaded, setAboutUsImageLoaded] = useState(false);
  const [doctorImageLoaded, setDoctorImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");

  const missionVisionValues = {
    mission: {
      title: "Our Mission",
      description:
        "We strive to provide exceptional dental care that enhances the quality of life for our patients through compassionate service, advanced technology, and personalized treatment plans that prioritize both oral health and overall wellbeing.",
      icon: <Heart className="w-10 h-10 text-white" />,
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the leading dental practice known for excellence, where patients feel valued and confident in receiving the highest standard of care in a comfortable environment, creating beautiful smiles that last a lifetime.",
      icon: <Star className="w-10 h-10 text-white" />,
    },
    values: {
      title: "Our Values",
      description:
        "Integrity in all our interactions, commitment to clinical excellence, compassion for each patient's unique needs, continuous education and innovation, and creating a positive impact in our community.",
      icon: <Award className="w-10 h-10 text-white" />,
    },
  };

  const teamMembers = [
    {
      name: "Dr. Kristina Castle",
      role: "Lead Dentist",
      description:
        "Dr. Castle brings over 15 years of experience in general and cosmetic dentistry. She earned her Doctor of Dental Surgery degree from Harvard School of Dental Medicine and is passionate about creating healthy, beautiful smiles.",
      specialty: "Cosmetic Dentistry",
    },
    {
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      description:
        "Specializing in orthodontic treatments, Dr. Chen helps patients achieve perfectly aligned smiles. He completed his orthodontic residency at the University of Pennsylvania and is an expert in both traditional braces and invisible aligners.",
      specialty: "Orthodontics",
    },
    {
      name: "Sarah Johnson",
      role: "Dental Hygienist",
      description:
        "With a gentle touch and thorough approach, Sarah ensures our patients receive exceptional preventive care. She has been with our practice for 8 years and is beloved by patients of all ages for her comforting chairside manner.",
      specialty: "Preventive Care",
    },
  ];

  const features = [
    {
      title: "State-of-the-Art Technology",
      description:
        "We utilize the latest dental technology to provide precise, comfortable, and efficient treatments.",
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Personalized Care",
      description:
        "Every treatment plan is tailored to address your specific needs and concerns.",
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Comfortable Environment",
      description:
        "Our clinic is designed to provide a relaxing and stress-free experience for all patients.",
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Highly Trained Staff",
      description:
        "Our team regularly participates in continuing education to stay at the forefront of dental care.",
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    },
  ];

  const stats = [
    {
      value: "15+",
      label: "Years of Experience",
      icon: <Clock className="w-6 h-6 text-primary" />,
    },
    {
      value: "10,000+",
      label: "Patients Treated",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      value: "99%",
      label: "Patient Satisfaction",
      icon: <Star className="w-6 h-6 text-primary" />,
    },
    {
      value: "25+",
      label: "Treatment Options",
      icon: <Award className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto mt-[120px] px-5 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-r from-teal-200/20 to-cyan-200/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-200/20 to-green-200/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="relative z-10 text-center mb-16">
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-teal-50 border border-teal-200 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm font-medium">
              About Our Dental Clinic
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#007E85] to-[#5be066] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Excellence in Dental Care
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            At DN Dental Clinic, we believe everyone deserves a healthy,
            confident smile. Our team of dental professionals is committed to
            providing exceptional care in a comfortable and welcoming
            environment.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            {/* Loading placeholder for AboutUs image */}
            {!aboutUsImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">
                <span className="text-gray-500">Loading...</span>
              </div>
            )}

            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={AboutUs}
                alt="About DN Dental Clinic"
                className="w-full h-auto object-cover"
                onLoad={() => setAboutUsImageLoaded(true)}
                style={{
                  opacity: aboutUsImageLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Transforming Smiles Since 2010
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Founded with a vision to provide exceptional dental care, DN
              Dental Clinic has been serving our community for over a decade.
              What began as a small practice has grown into a comprehensive
              dental center offering a wide range of services from preventive
              care to advanced cosmetic and restorative treatments.
            </motion.p>

            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our team of experienced dental professionals is committed to
              continuous education and staying at the forefront of dental
              advancements. We invest in state-of-the-art technology to ensure
              our patients receive the highest standard of care in a comfortable
              and welcoming environment.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Doctor Message Section */}
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

      {/* Why Choose Us CTA Section */}
      <section className="w-full max-w-screen-xl mx-auto px-5 py-20">
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl p-10 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose DN Dental Clinic?
            </motion.h2>

            <motion.p
              className="text-gray-600 text-center max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We combine expertise, technology, and compassion to ensure your
              dental experience exceeds expectations. Our patient-centered
              approach means we listen to your concerns and work with you to
              achieve your dental health goals.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="/services"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all"
              >
                Our Services
              </a>
              <a
                href="/booking"
                className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-3 rounded-lg font-medium transition-all"
              >
                Book Appointment
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
