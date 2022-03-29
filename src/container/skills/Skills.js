import React, { useState, useEffect, Suspense } from "react";
import AppWrap from "../../wrapper/AppWrap";
import MotionWrap from "../../wrapper/MotionWrap";
import { motion } from "framer-motion";
import axios from "axios";
import "./Skills.scss";
import { API_URL } from "../../config/config";
const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const item = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
  },
};
const Skills = () => {
  const [icons, setIcons] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const fetchData = async () => {
    const [skills, experiences] = await Promise.all([
      axios.get(`${API_URL}skills`),
      axios.get(`${API_URL}experiences`),
    ]);
    setIcons(skills.data[0].icons);
    setExperiences(experiences.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Suspense fallback="Loading...">
      <h2 className="head-text">
        Skills & <span>Experiences</span>
      </h2>
      <div className="app__skills">
        <motion.div
          variants={list}
          initial="hidden"
          whileInView={icons?.length > 0 && "visible"}
          className="app__skills-icons_container"
        >
          {icons &&
            icons.map((icon, idx) => (
              <motion.div
                variants={item}
                className="app__skills-icon"
                whileHover={{
                  y: [0, -10, 10, 0],
                  scale: [1.1, 1],
                  transition: {
                    duration: 0.4,
                    type: "spring",
                  },
                }}
                key={icon.name + idx}
              >
                <div
                  className="app__skills-icon_img"
                  style={{ backgroundColor: icon.bgColor }}
                >
                  <img src={icon.img} alt={icon.name} />
                </div>
                <p className="p-text">{icon.name}</p>
              </motion.div>
            ))}
        </motion.div>
        <div className="app__skills-experiences_container">
          {experiences?.map((experience) => (
            <div key={experience._id} className="app__skills-experience">
              <p className="app__skills-experience_year bold-text">
                {experience.year}
              </p>
              <div className="app__skills-experience_content">
                {experience.companies.map((company, idx) => (
                  <div
                    className="app__skills-experience-companies"
                    key={company.companyName + idx}
                  >
                    <h4 className="bold-text">{company.position}</h4>
                    <p className="p-text">{company.companyName}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default AppWrap(MotionWrap(Skills), "skills", {
  backgroundColor: "#fff",
});
