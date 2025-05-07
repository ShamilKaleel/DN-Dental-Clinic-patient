import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images = [], fullWidth = true }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  // Default images using files from public folder
  const defaultImages = [
    // Row 1
    {
      src: "/1.jpeg",
      alt: "Dental clinic image 1",
      title: "Professional Environment",
      description: "Our modern dental facility",
      row: 1,
    },
    {
      src: "/2.jpeg",
      alt: "Dental clinic image 2",
      title: "State-of-the-art Equipment",
      description: "Using the latest dental technology",
      row: 1,
    },
    {
      src: "/3.jpeg",
      alt: "Dental clinic image 3",
      title: "Patient Care",
      description: "Comfortable treatment experience",
      row: 1,
    },
    {
      src: "/4.jpeg",
      alt: "Dental clinic image 4",
      title: "Dental Procedures",
      description: "High-quality dental treatments",
      row: 1,
    },
    {
      src: "/5.jpeg",
      alt: "Dental clinic image 5",
      title: "Dental Expertise",
      description: "Experienced dental professionals",
      row: 1,
    },

    // Row 2
    {
      src: "/6.jpeg",
      alt: "Dental clinic image 6",
      title: "Friendly Staff",
      description: "Our welcoming team members",
      row: 2,
    },
    {
      src: "/7.jpeg",
      alt: "Dental clinic image 7",
      title: "Dental Health Education",
      description: "Learning about oral hygiene",
      row: 2,
    },
    {
      src: "/8.jpeg",
      alt: "Dental clinic image 8",
      title: "Patient Consultation",
      description: "Discussing treatment options",
      row: 2,
    },
    {
      src: "/9.jpeg",
      alt: "Dental clinic image 9",
      title: "Dental Checkups",
      description: "Regular dental maintenance",
      row: 2,
    },
    {
      src: "/10.jpeg",
      alt: "Dental clinic image 10",
      title: "Advanced Treatments",
      description: "Specialized dental procedures",
      row: 2,
    },

    // Row 3
    {
      src: "/11.jpeg",
      alt: "Dental clinic image 11",
      title: "Dental Care",
      description: "Comprehensive oral health services",
      row: 3,
    },
    {
      src: "/1.jpeg",
      alt: "Dental clinic image 1",
      title: "Clinic Environment",
      description: "Comfortable dental setting",
      row: 3,
    },
    {
      src: "/2.jpeg",
      alt: "Dental clinic image 2",
      title: "Patient Satisfaction",
      description: "Delivering quality care",
      row: 3,
    },
    {
      src: "/3.jpeg",
      alt: "Dental clinic image 3",
      title: "Dental Services",
      description: "Various treatment options",
      row: 3,
    },
    {
      src: "/4.jpeg",
      alt: "Dental clinic image 4",
      title: "Dental Professionals",
      description: "Our skilled dental team",
      row: 3,
    },
  ];

  // Use provided images or fall back to default samples
  const displayImages = images.length > 0 ? images : defaultImages;

  // Group images by row
  const groupedImages = displayImages.reduce((acc, image) => {
    const row = image.row || 1;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(image);
    return acc;
  }, {});

  // Convert the grouped object to an array of rows
  const rows = Object.keys(groupedImages)
    .map((rowKey) => ({
      rowNum: parseInt(rowKey),
      images: groupedImages[rowKey],
    }))
    .sort((a, b) => a.rowNum - b.rowNum);

  // Make sure we have all three rows with fallback data
  const ensuredRows = [
    rows.find((r) => r.rowNum === 1) || {
      rowNum: 1,
      images: defaultImages.filter((img) => img.row === 1),
    },
    rows.find((r) => r.rowNum === 2) || {
      rowNum: 2,
      images: defaultImages.filter((img) => img.row === 2),
    },
    rows.find((r) => r.rowNum === 3) || {
      rowNum: 3,
      images: defaultImages.filter((img) => img.row === 3),
    },
  ];

  // Scroll animation on page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Auto-scroll function that always runs
  useEffect(() => {
    // Different scroll speeds for different device sizes
    const getScrollSpeed = () => {
      // Adapt speed based on screen width
      if (window.innerWidth >= 1280) return 0.7; // XL screens
      if (window.innerWidth >= 1024) return 0.5; // Large screens
      return 0.4; // Default for smaller screens
    };

    const speed = getScrollSpeed();

    const interval = setInterval(() => {
      if (row1Ref.current) {
        row1Ref.current.scrollLeft += speed;

        // Check if we need to reset (we're near the end)
        const isNearEnd =
          row1Ref.current.scrollLeft >=
          row1Ref.current.scrollWidth - row1Ref.current.clientWidth - 10;

        if (isNearEnd) {
          row1Ref.current.scrollLeft = 0;
        }
      }

      if (row2Ref.current) {
        row2Ref.current.scrollLeft -= speed;

        // Check if we need to reset (we're near the beginning)
        const isNearStart = row2Ref.current.scrollLeft <= 10;

        if (isNearStart) {
          row2Ref.current.scrollLeft =
            row2Ref.current.scrollWidth - row2Ref.current.clientWidth;
        }
      }

      if (row3Ref.current) {
        row3Ref.current.scrollLeft += speed;

        // Check if we need to reset (we're near the end)
        const isNearEnd =
          row3Ref.current.scrollLeft >=
          row3Ref.current.scrollWidth - row3Ref.current.clientWidth - 10;

        if (isNearEnd) {
          row3Ref.current.scrollLeft = 0;
        }
      }
    }, 30); // Slower interval for more relaxed scrolling

    // Handle window resize to adjust scroll behavior
    const handleResize = () => {
      // Force reset scroll positions on resize to avoid getting stuck
      if (row1Ref.current) row1Ref.current.scrollLeft = 0;
      if (row2Ref.current)
        row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
      if (row3Ref.current) row3Ref.current.scrollLeft = 0;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialize row positions after component mounts
  useEffect(() => {
    // Set initial positions
    if (row1Ref.current) row1Ref.current.scrollLeft = 0;
    if (row2Ref.current)
      row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
    if (row3Ref.current) row3Ref.current.scrollLeft = 0;
  }, []);

  // Open image in lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  // Close the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Manual scroll handler for row
  const scroll = (rowRef, direction) => {
    if (rowRef.current) {
      const scrollAmount = direction * 300;
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      <motion.div
        className="w-full flex flex-col relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-6">
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium inline-block">
              Our Gallery
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl lg:text-5xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Dental Care Excellence
          </motion.h2>

          <motion.p
            className="mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our clinic and services through these captured moments
          </motion.p>
        </div>
        <div className="flex flex-col">
          {/* Row 1 - Left to Right */}
          <div className="relative group">
            <div
              ref={row1Ref}
              className="flex overflow-x-auto scrollbar-hide h-48"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Duplicate first set of images for continuous scrolling */}
              {[...ensuredRows[0].images, ...ensuredRows[0].images].map(
                (image, imgIndex) => (
                  <motion.div
                    key={`row1-${imgIndex}`}
                    className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay:
                        0.1 *
                        Math.min(imgIndex % ensuredRows[0].images.length, 5),
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || `Gallery image ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <Expand className="absolute top-2 right-2 w-5 h-5 text-white" />
                      <h3 className="text-white font-semibold text-sm">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-xs truncate">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-r-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row1Ref, -1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-l-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row1Ref, 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative group">
            <div
              ref={row2Ref}
              className="flex overflow-x-auto scrollbar-hide h-48"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Duplicate second set of images for continuous scrolling */}
              {[...ensuredRows[1].images, ...ensuredRows[1].images].map(
                (image, imgIndex) => (
                  <motion.div
                    key={`row2-${imgIndex}`}
                    className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay:
                        0.1 *
                        Math.min(imgIndex % ensuredRows[1].images.length, 5),
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || `Gallery image ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <Expand className="absolute top-2 right-2 w-5 h-5 text-white" />
                      <h3 className="text-white font-semibold text-sm">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-xs truncate">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-r-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row2Ref, -1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-l-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row2Ref, 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="relative group">
            <div
              ref={row3Ref}
              className="flex overflow-x-auto scrollbar-hide h-48"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Duplicate third set of images for continuous scrolling */}
              {[...ensuredRows[2].images, ...ensuredRows[2].images].map(
                (image, imgIndex) => (
                  <motion.div
                    key={`row3-${imgIndex}`}
                    className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay:
                        0.1 *
                        Math.min(imgIndex % ensuredRows[2].images.length, 5),
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || `Gallery image ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <Expand className="absolute top-2 right-2 w-5 h-5 text-white" />
                      <h3 className="text-white font-semibold text-sm">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-xs truncate">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-r-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row3Ref, -1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-l-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={() => scroll(row3Ref, 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox for viewing selected image */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-screen w-full">
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.alt || `Gallery image`}
              className="w-full h-full object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm">
              <h3 className="text-white font-bold text-xl">
                {selectedImage.title}
              </h3>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageGallery;
