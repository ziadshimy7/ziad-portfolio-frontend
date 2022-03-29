import React, { useState } from "react";
import "./Footer.scss";
import MotionWrap from "../../wrapper/MotionWrap";
import AppWrap from "../../wrapper/AppWrap";
import { images } from "../../constants";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../../config/config";
const Footer = () => {
  const { email, mobile } = images;
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState("");
  const validateInputs = () => {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      message.trim() !== "" &&
      userEmail.match(validEmailRegex) &&
      name.trim() !== ""
    ) {
      return true;
    }
    setError(
      "Please fill in all of the inputs and make sure the email is valid."
    );
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setName("");
    setMessage("");
    setUserEmail("");
    setError(null);
    try {
      const response = await axios.post(`${API_URL}sendemail`, {
        name,
        userEmail,
        message,
      });
      setMessageSuccess(
        "Your message has been sent, Thank you for your feedback !"
      );
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="app__footer">
      <h2 className="head-text">
        Get in touch <span>with me</span>
      </h2>
      <div className="app__footer-contacts">
        <div className="app__footer-contacts_email">
          <img src={email} alt="email icon" />
          <p className="p-text">ziadshimy7@gmail.com</p>
        </div>
        <div className="app__footer-contacts_mobile">
          <img src={mobile} alt="mobile icon" />
          <p className="p-text">+7 (912) 239-00-87</p>
        </div>
      </div>
      <form className="app__footer-form">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="p-text"
          type="text"
          value={name}
          placeholder="Your Name"
        />
        <input
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          className="p-text"
          type="text"
          value={userEmail}
          placeholder="Your Email"
        />
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="p-text"
          placeholder="Your Message"
        ></textarea>
        {error ? (
          <p className="p-text" style={{ color: "red", fontSize: "1rem" }}>
            {error}
          </p>
        ) : (
          <p style={{ color: "green", fontSize: "1rem" }}>{messageSuccess}</p>
        )}
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={sendEmail}
          className="app__footer-btn p-text"
          type="submit"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  );
};

export default AppWrap(MotionWrap(Footer), "contact", {
  backgroundColor: "#fff",
});
