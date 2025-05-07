import { useState, useEffect } from "react";
import { BookingDoctor as BookingDoctor } from "../assets/index";

export default function Doctor() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset states when component mounts
    setImageLoaded(false);
    setImageError(false);

    // Preload the image
    const img = new Image();
    img.src = BookingDoctor;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);

    return () => {
      // Clean up
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <>
      <div className="bg-white z-20 w-full flex md:flex-row flex-col md:gap-14 gap-5 p-5 sm:px-8 sm:py-6 items-center md:items-start lg:items-center rounded-2xl shadow-md">
        {/* Image container with skeleton loading */}
        <div className="flex-shrink-0 w-full md:w-auto max-w-[250px]">
          {!imageLoaded && !imageError ? (
            // Skeleton loader
            <div className="animate-pulse bg-gray-200 w-full h-[250px] md:h-[300px] md:w-[220px] lg:w-[290px] rounded-2xl" />
          ) : imageError ? (
            // Error state
            <div className="bg-gray-100 w-full h-[250px] md:h-[300px] md:w-[220px] lg:w-[290px] rounded-2xl flex items-center justify-center">
              <p className="text-gray-500">Failed to load image</p>
            </div>
          ) : (
            // Loaded image
            <img
              src={BookingDoctor}
              alt="doctor"
              className="w-full h-auto object-cover rounded-2xl md:max-w-[220px] lg:max-w-[290px]"
            />
          )}
        </div>
        <div className="flex flex-col gap-5 xl:max-w-2xl lg:max-w-lg max-w-[290px] items-center md:items-start">
          <h1 className="text-black text-2xl lg:text-4xl font-bold">
            Dr.Umashankar
          </h1>
          <p className="text-primary text-xl">Dentist</p>
          <p className="text-gray-500 text-center md:text-start">
            Dr. Umashankar is a dedicated dental professional at the Base
            Hospital, with a degree in Dental Surgery from the University of
            Peradeniya. He is committed to delivering exceptional oral
            healthcare through a patient-centered approach, focusing on comfort,
            prevention, and personalized treatment.{" "}
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center size-[60px] rounded-full border border-green-400">
              <p className="text-blue-600 text-2xl">@</p>
            </div>

            <div className="flex flex-col">
              <p className="text-black text-lg font-bold">EMAIL NOW:</p>
              <p className="text-black text-lg">dndentalcliniclk@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
