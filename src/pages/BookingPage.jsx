import Doctor from "../components/Doctor";
import Schedule from "../components/Schedule";
import Loader from "../components/Loader";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      setError(null); // Reset any previous error

      try {
        const response = await axiosInstance.get("/schedules/getSeven");
        setSchedules(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          // Server responded with a status code other than 2xx
          setError(
            `${err.response.data.details.error || "Something went wrong"}`
          );
        } else if (err.request) {
          // Request was made but no response received
          setError(
            "Network Error: Unable to fetch schedule data. Please check your internet connection."
          );
        } else {
          // Other errors (e.g., setup issue)
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Loader />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-red-500">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-[92px] lg:h-[1000px] md:h-[1000px] h-[1300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="h-[258px] w-full flex justify-center bg-primary relative px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute top-1/4 md:top-1/3 xl:max-w-screen-xl lg:max-w-screen-lg lg:w-full flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Doctor />
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-black text-2xl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Schedule an Appointment
            </motion.h1>

            <div className="flex flex-col gap-1">
              {schedules.map((schedule, index) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1, // Staggered animation for each schedule item
                  }}
                >
                  <Schedule schedule={schedule} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
