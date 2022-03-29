import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AppWrap from "../../wrapper/AppWrap";
import "./Work.scss";
import Card from "../../UI/Card";
import MotionWrap from "../../wrapper/MotionWrap";
import { API_URL } from "../../config/config";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState([]);
  const animateCard = { y: 0, opacity: 1 };
  const handleWorkFilter = (item) => {};
  const fetchWork = async () => {
    try {
      const worksData = await axios.get(`${API_URL}work`);
      if (worksData) setWorks(worksData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWork();
  }, []);
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>
      <div className="app__work-filter">
        {["UI/UX", "Web App", "Mobile App", "React JS", "All"].map(
          (item, idx) => (
            <div
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
              onClick={() => {
                handleWorkFilter(item);
              }}
              key={idx}
            >
              {item}
            </div>
          )
        )}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {works?.map((item, idx) => (
          <Card
            key={item + idx}
            description={item.name}
            imgURL={item.img}
            tag={item.tag}
            githubLink={item.githubLink}
            hostingLink={item.hostingLink}
          />
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work), "work");
