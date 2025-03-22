import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
// Enhanced Layout component with animation
export default function Layout() {
  return (
    <div className="flex flex-col mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
