import { Link } from "react-router-dom";
import { services } from "../data/index";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Award, Check } from "lucide-react";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle service card hover
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-screen-xl m-auto py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Services Grid with simplified cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            index={index}
            isActive={activeIndex === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </motion.div>
  );
}

const ServiceCard = ({
  service,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Card animations with simpler effects
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Simple content animations
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
  };

  // Simple hover animations
  const hoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
      y: 0,
    },
    hover: {
      scale: 1.02,
      y: -3,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  // Image animations
  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { duration: 0.4 },
    },
  };

  // Features that might be relevant to the service
  const getServiceFeatures = () => {
    const baseFeatures = [
      "Expert practitioners",
      "Modern techniques",
      "Comfortable procedure",
    ];

    // Custom features based on service name
    if (service.name.includes("Implant")) {
      return ["Lifetime warranty", "Natural appearance", "Improved confidence"];
    } else if (service.name.includes("Whitening")) {
      return [
        "Visible results immediately",
        "Safe procedure",
        "Long-lasting effects",
      ];
    } else if (service.name.includes("Extraction")) {
      return ["Pain-free procedure", "Quick recovery", "Preventive care"];
    } else if (service.name.includes("Orthodontic")) {
      return ["Straighter smile", "Improved bite", "Customized treatment"];
    } else if (service.name.includes("Root Canal")) {
      return ["Tooth preservation", "Pain relief", "High success rate"];
    } else if (service.name.includes("Bridges")) {
      return [
        "Natural appearance",
        "Improved speech",
        "Restored functionality",
      ];
    }

    return baseFeatures;
  };

  return (
    <motion.div
      className="flex flex-col rounded-3xl h-full overflow-hidden"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate={isActive ? "hover" : "rest"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 h-full flex flex-col">
        {/* Image container with simple overlay */}
        <div className="relative overflow-hidden">
          <div className="aspect-3/2 overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              variants={imageVariants}
            />
          </div>

          {/* Simple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content area - Simplified but attractive */}
        <div className="flex flex-col flex-grow p-5">
          <motion.div
            variants={contentVariants}
            className="flex flex-col h-full"
          >
            {/* Service title */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {service.name}
            </h2>

            {/* Service description with better typography */}
            <p className="text-gray-600 text-sm mb-4">
              {service.description.length > 120
                ? `${service.description.substring(0, 120)}...`
                : service.description}
            </p>

            {/* Simple feature list */}
            <div className="mt-auto">
              <ul className="space-y-2 mb-4">
                {getServiceFeatures()
                  .slice(0, 3)
                  .map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <Check
                        size={14}
                        className="text-primary mr-2 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>

              {/* Simple CTA Button */}
              <Link
                to={service.link}
                className="flex items-center justify-center w-full py-2.5 px-4 mt-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                <span>Learn More</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
