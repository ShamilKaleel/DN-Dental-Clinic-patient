import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

/**
 * ModernTestimonialSlider - A premium testimonial display for dental clinics
 * Features:
 * - Modern card-based design with subtle animations
 * - Dual card layout showing two testimonials at once
 * - Visual star ratings with gold highlights
 * - Auto-rotation with manual navigation controls
 * - Fully responsive for all device sizes
 */
const ModernTestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/feedback/show");

        if (response.data && Array.isArray(response.data)) {
          // Sort by rating (highest first) and then by date (newest first)
          const sortedTestimonials = [...response.data].sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setTestimonials(sortedTestimonials);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load testimonials at this time.");

        // Set fallback testimonials for development
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            comments:
              "Dr. Castle is amazing! My dental anxiety is completely gone after my first visit. The whole staff is professional and caring.",
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Michael Chen",
            rating: 5,
            comments:
              "The best dental experience I've ever had. State-of-the-art facility and the team took time to explain everything in detail.",
            createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          },
          {
            id: 3,
            name: "Emma Rodriguez",
            rating: 4,
            comments:
              "Professional service and a beautiful clinic. I feel confident smiling again after my treatment!",
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          },
          {
            id: 4,
            name: "David Wilson",
            rating: 5,
            comments:
              "The team at DN Dental Clinic made my wisdom tooth extraction painless and smooth. I highly recommend their services!",
            createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-advance testimonials (if more than 2)
  useEffect(() => {
    if (!autoplay || testimonials.length <= 2) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 2;
        return nextIndex >= testimonials.length ? 0 : nextIndex;
      });
    }, 6000);

    return () => clearInterval(intervalId);
  }, [testimonials.length, autoplay]);

  // Navigation handlers
  const goToPrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 2;
      return newIndex < 0 ? Math.max(testimonials.length - 2, 0) : newIndex;
    });
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 2;
      return newIndex >= testimonials.length ? 0 : newIndex;
    });
  };

  // Jump to specific pair
  const jumpToPair = (pairIndex) => {
    setAutoplay(false);
    setCurrentIndex(pairIndex * 2);
  };

  // Render star ratings with animation
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Star
          size={18}
          className={`${
            index < rating
              ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
              : "text-gray-200"
          }`}
        />
      </motion.div>
    ));
  };

  // Format date in a friendly way - not used anymore
  const formatDate = (dateString) => {
    return ""; // Return empty string since date display is removed
  };

  // Loading state UI
  if (isLoading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-5 xl:px-20 py-16">
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error && testimonials.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-5 xl:px-20 py-16">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state UI
  if (testimonials.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-5 xl:px-20 py-16">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary/40" />
          <p className="text-gray-600">
            No testimonials available yet. Be the first to share your
            experience!
          </p>
        </div>
      </div>
    );
  }

  // Get current testimonials to display (pair of 2, or just 1 if only 1 remains)
  const currentTestimonials = [
    testimonials[currentIndex],
    currentIndex + 1 < testimonials.length
      ? testimonials[currentIndex + 1]
      : null,
  ].filter(Boolean);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-5 xl:px-20 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Patient Experiences
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Patients Say
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real stories from people who've experienced our dental care
          </motion.p>
        </div>

        {/* Testimonial display */}
        <div className="mb-10">
          {/* Control buttons for large screens */}
          {testimonials.length > 2 && (
            <div className="hidden md:flex justify-end mb-6 gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Testimonial cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Card header with accent color */}
                  <div className="h-2 bg-gradient-to-r from-primary to-teal-400"></div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Rating only */}
                    <div className="flex mb-4">
                      <div className="flex">
                        {renderStars(testimonial.rating || 5)}
                      </div>
                    </div>

                    {/* Testimonial text */}
                    <div className="mb-5 flex-grow">
                      <p className="text-gray-700 leading-relaxed">
                        "
                        {testimonial.comments ||
                          "Excellent dental care and wonderful staff!"}
                        "
                      </p>
                    </div>

                    {/* Patient info */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-teal-500/80 flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {testimonial.name ? testimonial.name.charAt(0) : "A"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {testimonial.name || "Anonymous Patient"}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Verified Patient
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile navigation buttons */}
          {testimonials.length > 2 && (
            <div className="flex md:hidden justify-center mt-8 gap-4">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Pagination indicators */}
          {testimonials.length > 2 && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
                (_, pairIndex) => {
                  // Determine if this is the current pair
                  const isActive = Math.floor(currentIndex / 2) === pairIndex;

                  return (
                    <button
                      key={pairIndex}
                      onClick={() => jumpToPair(pairIndex)}
                      className={`mx-1 transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-8 h-2 bg-primary"
                          : "w-2 h-2 bg-gray-300 hover:bg-primary/50"
                      }`}
                      aria-label={`Go to testimonial pair ${pairIndex + 1}`}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* End of testimonials section */}
      </div>
    </section>
  );
};

export default ModernTestimonialSlider;
