import React, { useEffect, useState } from "react";
import "./Testimonial.scss";
import AppWrap from "../../wrapper/AppWrap";
import MotionWrap from "../../wrapper/MotionWrap";
import { images } from "../../constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Brands } from "../../components";
import axios from "axios";
import { API_URL } from "../../config/config";
const Testimonial = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animationDirecton, setAnimationDirection] = useState("right");
  const [testimonials, setTestimonials] = useState([]);
  const handlePrevClick = () => {
    setAnimationDirection("left");
    if (testimonialIndex === 0) {
      setTestimonialIndex(testimonials.length - 1);
      return;
    }
    setTestimonialIndex((prevState) => prevState - 1);
  };
  const handleNextClick = () => {
    setAnimationDirection("right");
    if (testimonialIndex === testimonials.length - 1) {
      setTestimonialIndex(0);
      return;
    }
    setTestimonialIndex((prevState) => prevState + 1);
  };
  const fetchTestimonials = async () => {
    try {
      const testimonials = await axios.get(`${API_URL}testimonials`);
      setTestimonials(testimonials.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);
  return (
    <>
      <h2 className="head-text">Testimonials</h2>
      {testimonials.length > 0 && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{
              opacity: 0,
              x: animationDirecton === "right" ? -200 : 200,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: animationDirecton === "right" ? 200 : -200,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            key={testimonialIndex}
            className="app__testimonials"
          >
            <div className="app__testimonial-image">
              <img src={testimonials[testimonialIndex].img} alt="person" />
            </div>
            <div className="app__testimonial-content">
              <p>{testimonials[testimonialIndex].comment}</p>
              <div className="app__testimonial-person">
                <h5 className="bold-text">
                  {testimonials[testimonialIndex].name}
                </h5>
                <p className="p-text">
                  {testimonials[testimonialIndex].position}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="app__testimonials-btns">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handlePrevClick}
          className="app__testimonials-prevBtn"
        >
          <FiChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleNextClick}
          className="app__testimonials-nextBtn"
        >
          <FiChevronRight size={20} />
        </motion.button>
      </div>
      <Brands />
    </>
  );
};

export default AppWrap(MotionWrap(Testimonial), "testimonials");
