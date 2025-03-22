import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";

const EnhancedImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  // Sample default images using real URLs
  const defaultImages = [
    // Row 1
    {
      src: "https://source.unsplash.com/400x300/?university",
      alt: "Professor teaching",
      title: "Academic Excellence",
      description: "Experienced faculty delivering quality education",
      row: 1,
    },
    {
      src: "https://source.unsplash.com/400x300/?concert",
      alt: "Concert event",
      title: "Cultural Events",
      description: "Live performances and entertainment",
      row: 1,
    },
    {
      src: "https://source.unsplash.com/400x300/?rugby",
      alt: "Rugby ball",
      title: "Sports Activities",
      description: "Promoting physical fitness and teamwork",
      row: 1,
    },
    {
      src: "https://source.unsplash.com/400x300/?students",
      alt: "Students celebrating",
      title: "Student Life",
      description: "Building lifelong friendships and memories",
      row: 1,
    },
    {
      src: "https://source.unsplash.com/400x300/?library",
      alt: "Professor teaching",
      title: "Academic Excellence",
      description: "Experienced faculty delivering quality education",
      row: 1,
    },

    // Row 2
    {
      src: "https://source.unsplash.com/400x300/?technology",
      alt: "Technology logo",
      title: "Innovation Hub",
      description: "Cutting-edge technology initiatives",
      row: 2,
    },
    {
      src: "https://source.unsplash.com/400x300/?campus-life",
      alt: "Campus activities",
      title: "Campus Life",
      description: "Engaging activities for students",
      row: 2,
    },
    {
      src: "https://source.unsplash.com/400x300/?naval-officer",
      alt: "Naval officer",
      title: "Leadership Training",
      description: "Developing future leaders",
      row: 2,
    },
    {
      src: "https://source.unsplash.com/400x300/?performance",
      alt: "Performance",
      title: "Performing Arts",
      description: "Showcasing talent and creativity",
      row: 2,
    },
    {
      src: "https://source.unsplash.com/400x300/?innovation",
      alt: "Technology logo",
      title: "Innovation Hub",
      description: "Cutting-edge technology initiatives",
      row: 2,
    },

    // Row 3
    {
      src: "https://source.unsplash.com/400x300/?campus-greenery",
      alt: "Campus greenery",
      title: "Campus Beauty",
      description: "Our beautiful and sustainable campus",
      row: 3,
    },
    {
      src: "https://source.unsplash.com/400x300/?community-outreach",
      alt: "Children activities",
      title: "Community Outreach",
      description: "Engaging with our local community",
      row: 3,
    },
    {
      src: "https://source.unsplash.com/400x300/?collaboration",
      alt: "Students together",
      title: "Collaboration",
      description: "Working together to achieve more",
      row: 3,
    },
    {
      src: "https://source.unsplash.com/400x300/?campus-entrance",
      alt: "Campus entrance",
      title: "Our Institution",
      description: "A place of learning and growth",
      row: 3,
    },
    {
      src: "https://source.unsplash.com/400x300/?campus-park",
      alt: "Campus greenery",
      title: "Campus Beauty",
      description: "Our beautiful and sustainable campus",
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

  // Scroll animation on page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Auto-scroll function
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (row1Ref.current) {
        row1Ref.current.scrollLeft += 1;
        // Reset scroll position when reached the end
        if (
          row1Ref.current.scrollLeft >=
          row1Ref.current.scrollWidth - row1Ref.current.clientWidth - 5
        ) {
          row1Ref.current.scrollLeft = 0;
        }
      }

      if (row2Ref.current) {
        row2Ref.current.scrollLeft -= 1;
        // Reset scroll position when reached the beginning
        if (row2Ref.current.scrollLeft <= 5) {
          row2Ref.current.scrollLeft =
            row2Ref.current.scrollWidth - row2Ref.current.clientWidth;
        }
      }

      if (row3Ref.current) {
        row3Ref.current.scrollLeft += 1;
        // Reset scroll position when reached the end
        if (
          row3Ref.current.scrollLeft >=
          row3Ref.current.scrollWidth - row3Ref.current.clientWidth - 5
        ) {
          row3Ref.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Pause auto-scroll when hovering
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Open image in lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    setIsAutoScrolling(false);
  };

  // Close the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    setIsAutoScrolling(true);
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
    <div
      ref={containerRef}
      className="w-full py-8 relative overflow-hidden rounded-3xl"
    >
      <motion.div
        className="w-full max-w-screen-xl m-auto flex flex-col relative z-10"
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
            <span className="text-sm font-medium">Our Gallery</span>
          </motion.div>

          <motion.h2
            className="text-3xl lg:text-5xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Campus Life & Activities
          </motion.h2>

          <motion.p
            className="mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our vibrant community through these captured moments
          </motion.p>
        </div>
        <div className="flex flex-col">
          {/* Row 1 - Left to Right */}
          <div className="relative group">
            <div
              ref={row1Ref}
              className="flex overflow-x-auto scrollbar-hide h-48"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {rows[0]?.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * Math.min(imgIndex, 5),
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
              ))}
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {rows[1]?.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * Math.min(imgIndex, 5),
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
              ))}
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {rows[2]?.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="relative flex-shrink-0 w-64 h-48 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * Math.min(imgIndex, 5),
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
              ))}
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

export default EnhancedImageGallery;
