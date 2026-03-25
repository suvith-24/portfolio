"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaKaggle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Portfolio() {
  const sections = [
    "about",
    "projects",
    "experience",
    "skills",
    "publications",
    "achievements",
    "contact",
  ];

  const [active, setActive] = useState("about");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -----------------------------
  // Projects
  // -----------------------------
  const projects = [
    {
      title: "Football Data Pipeline",
      description:
        "End-to-end football analytics pipeline processing 1.7M+ records with ETL workflow, PostgreSQL warehouse, and Streamlit dashboard.",
      tech: "Python · PostgreSQL · ETL · Streamlit",
      image: "/projects/football.jpg",
      github: "https://github.com/suvith-24/football-data-pipeline",
    },
    {
      title: "DeutscheGrab – German Vocabulary Trainer",
      description:
        "Flask-based adaptive learning app for German vocabulary with quiz modes, user accounts, and ML-based learning system.",
      tech: "Python · Flask · ML · CSV",
      image: "/projects/deutschegrab.jpg",
      github: "https://github.com/suvith-24/DeutscheGrab1",
    },
    {
      title: "More Projects Coming Soon",
      description: "Add your next ML / Data Science project here.",
      tech: "Python · ML · Data Science",
      image: "/projects/placeholder.jpg",
      github: "#",
    },
  ];

  // -----------------------------
  // Experience
  // -----------------------------
  const experiences = [
    {
      role: "Python Instructor and Developer",
      company: "Static Int. Educare",
      duration: "June 2024 - December 2024",
      description: `Instructed Python and Data Science to approximately 40 students over a one-month period.
Developed and delivered curriculum focusing on Python programming fundamentals and data analysis. Facilitated hands-on learning
activities and provided guidance on real-world Python applications.`,
      keyAchievement:
        "Received positive feedback from 90% of students for effective teaching methods and curriculum.",
    },
    {
      role: "Machine Learning Intern",
      company: "Techqkonnect",
      duration: "December 2023 - May 2024",
      description: `Analysed datasets to identify patterns and trends. Designed and implemented machine learning models for various projects.
Conducted exploratory data analysis and presented dashboards on Tableau for stakeholder insights.
Projects included image processing, sentiment analysis, image recognition models, and data visualization using matplotlib and seaborn.`,
      keyAchievement:
        "Successfully increased the accuracy of image recognition models by 15%.",
    },
  ];

  // -----------------------------
  // Contact Form State
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize EmailJS with environment variable
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS with environment variables
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      // Reset form on success
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      alert("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      console.error("EmailJS error:", error);
      setIsSubmitting(false);
      alert("Failed to send message. Please try again later.");
    }
  };

  // -----------------------------
  // Achievements
  // -----------------------------
  const achievements = [
    {
      icon: "🏆",
      title: "VNPS 2024",
      description: "Winner, 1st Prize in Machine Learning domain",
    },
    {
      icon: "🥈",
      title: "ML-Fiesta 2024",
      description:
        "Secured 2nd place at All India Hackathon organized by IIIT Bangalore on Unstop",
    },
    {
      icon: "♟️",
      title: "Inter-Level Chess",
      description:
        "1st Position, Vidyavardhini’s College of Engineering and Technology",
    },
  ];

  // -----------------------------
  // Scroll spy effect
  // -----------------------------
  useEffect(() => {
    const handleScroll = () => {
      const sectionsDOM = document.querySelectorAll("section");
      let current = "about";
      sectionsDOM.forEach((section) => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.getAttribute("id");
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------
  // Skills SVG logos mapping
  // -----------------------------
  const skillsIcons = {
    python: "/logos/python.svg?v=1",
    sql: "/logos/sql.svg?v=1",
    streamlit: "/logos/Streamlit.svg?v=1",
    tensorflow: "/logos/TensorFlow.svg?v=1",
    scikitlearn: "/logos/scikitlearn.svg?v=1",
    opencv: "/logos/opencv.svg?v=1",
    powerbi: "/logos/powerbi.svg?v=1",
    matplotlib: "/logos/Matplotlib.svg?v=1",
    seaborn: "/logos/seaborn.svg?v=1",
    vscode: "/logos/vscode.svg?v=1",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md p-4 flex items-center justify-between z-50">
        <div
          className="text-xl font-bold cursor-pointer text-purple-400"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Suvith Shetty
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`capitalize transition ${
                active === sec ? "text-purple-400" : "text-white"
              }`}
            >
              {sec}
            </a>
          ))}
        </div>

        {/* Desktop Social Links */}
        <div className="hidden md:flex gap-4 items-center text-2xl">
          <a
            href="https://www.linkedin.com/in/suvith-shetty/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/suvith-24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.kaggle.com/suvithshetty"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 text-lg font-bold"
          >
            <FaKaggle className="w-6 h-6 inline-block" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl text-white hover:text-purple-400 transition"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {/* Mobile Navigation Links */}
              {sections.map((sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`capitalize transition py-2 px-4 rounded-lg ${
                    active === sec
                      ? "text-purple-400 bg-purple-500/20"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {sec}
                </a>
              ))}

              {/* Mobile Social Links */}
              <div className="flex gap-4 items-center justify-center pt-4 border-t border-white/10">
                <a
                  href="https://www.linkedin.com/in/suvith-shetty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/30 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/suvith-24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/30 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.kaggle.com/suvithshetty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/30 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <FaKaggle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - About */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center px-4 py-20 scroll-mt-20"
        id="about"
      >
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-white/20" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center order-1"
            >
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full border-4 border-purple-500 shadow-2xl shadow-purple-500/50 object-cover"
              />
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left order-2"
            >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">Suvith Shetty</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-purple-400 font-semibold mb-4 lg:mb-6">Data Scientist | AI Professional</p>
            
            <div className="space-y-3 lg:space-y-4 text-gray-300 leading-relaxed mb-6 lg:mb-8 text-sm sm:text-base">
              <p>
                Aspiring Data Scientist and AI professional with a strong foundation in Python, Machine Learning, and Deep Learning. Experienced in analysing complex datasets, building predictive models, and creating practical solutions for real-world problems across healthcare, agriculture, and technology domains.
              </p>
              <p>
                Ambitious to shape sustainable, accessible, and inclusive business practices through data science, while continuously learning new technologies and exploring innovative approaches to drive real accountability and professional growth in a supportive team environment.
              </p>
              <p>
                Passionate about leveraging data-driven insights to solve meaningful problems and contribute to technological advancement in emerging fields.
              </p>
              <p className="text-green-400 font-semibold text-base sm:text-lg mt-4 lg:mt-6 border-t border-purple-500/20 pt-4 lg:pt-6">
                🎯 Open For AI/ML Roles — Remote or Germany
              </p>
            </div>

            <a
              href="/resume.pdf"
              className="inline-block px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition transform hover:scale-105 font-semibold text-sm sm:text-base"
              download
            >
              Download Resume
            </a>
          </motion.div>
        </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Projects</h2>
        <Carousel projects={projects} />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Experience</h2>
        <div className="flex flex-col gap-4 sm:gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-white/10 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:bg-opacity-30"
            >
              <h3 className="text-base sm:text-lg font-semibold">{exp.role}</h3>
              <p className="text-gray-400 text-sm">{exp.company}</p>
              <p className="text-gray-400 text-sm">{exp.duration}</p>
              <p className="text-gray-300 mt-2 text-sm sm:text-base leading-relaxed">{exp.description}</p>
              <p className="text-cyan-300 mt-2 font-medium drop-shadow-lg text-sm sm:text-base">
                Key Achievement: {exp.keyAchievement}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 sm:gap-6 justify-items-center max-w-4xl mx-auto">
          {Object.keys(skillsIcons).map((skill) => (
            <div
              key={skill}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative group w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-black/20 rounded p-1 sm:p-2 hover:bg-purple-500/30 transition-all duration-300 touch-manipulation"
            >
              {hoveredSkill === skill && (
                <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-black/80 text-xs text-white px-2 py-1 rounded border border-purple-400 whitespace-nowrap shadow-lg z-10">
                  {skill.toUpperCase()}
                </span>
              )}
              <img
                src={skillsIcons[skill]}
                alt={skill}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Publications</h2>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="bg-white/10 p-4 sm:p-6 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:bg-opacity-30 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-semibold">
              Facial Emotion Recognition from Video using Transfer Learning
            </h3>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Published on IEEE Xplore</p>
            <a
              href="https://ieeexplore.ieee.org/document/10498195"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-3 inline-block text-cyan-300 hover:text-cyan-200 text-sm font-semibold"
            >
              View Paper →
            </a>
          </div>

          <div className="bg-white/10 p-4 sm:p-6 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:bg-opacity-30 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-semibold">
              Whitefly and Cotton Leaf Curl Disease (CLCUD) Detection in Cotton
              Plants Using Deep Learning
            </h3>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Published on IEEE Xplore</p>
            <a
              href="https://ieeexplore.ieee.org/document/11371152"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-3 inline-block text-cyan-300 hover:text-cyan-200 text-sm font-semibold"
            >
              View Paper →
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20 flex flex-col items-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center max-w-6xl">
          {achievements.map((ach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white/10 p-4 sm:p-6 rounded-xl w-full max-w-xs hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:bg-opacity-30 transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{ach.icon}</span>
              <h3 className="text-base sm:text-lg font-semibold mb-1 text-center">{ach.title}</h3>
              <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed">{ach.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Get In Touch</h2>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Information Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-400" />
              Contact Information
            </h3>
            
            {/* Personal Info */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/20 rounded-xl group hover:bg-purple-500/20 transition-all duration-300">
                <FaEnvelope className="text-lg sm:text-xl text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
                <a 
                  href="mailto:suvith.shetty2405@gmail.com" 
                  className="text-base sm:text-lg hover:text-purple-300 transition break-all"
                >
                  suvith.shetty2405@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/20 rounded-xl group hover:bg-purple-500/20 transition-all duration-300">
                <FaPhone className="text-lg sm:text-xl text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
                <a href="tel:+4915511319619" className="text-base sm:text-lg hover:text-purple-300 transition">
                  +49 15511 319619
                </a>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/20 rounded-xl group hover:bg-purple-500/20 transition-all duration-300">
                <FaMapMarkerAlt className="text-lg sm:text-xl text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
                <div>
                  <p className="text-base sm:text-lg">Thesdorf, Schleswig-Holstein</p>
                  <p className="text-sm text-gray-400">Germany</p>
                </div>
              </div>
            </div>

            {/* Connect with me */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                Connect with me
              </h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/suvith-shetty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-black/30 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://github.com/suvith-24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-black/30 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://www.kaggle.com/suvithshetty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-black/30 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <FaKaggle className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <FaPaperPlane className="text-purple-400" />
              Send me message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 sm:p-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 text-base"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 sm:p-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 text-base"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 sm:p-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none text-base"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 sm:p-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </section>
    </main>
  );
}

// -----------------------------
// Carousel Component
// -----------------------------
function Carousel({ projects }) {
  const containerRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = window.innerWidth < 640 ? 280 + 16 : 300 + 24; // Responsive card width
    container.scrollLeft =
      direction === "left"
        ? container.scrollLeft - cardWidth
        : container.scrollLeft + cardWidth;
  };

  return (
    <div className="relative overflow-hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll("left")}
        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-600 p-2 sm:p-3 rounded-full z-10 touch-manipulation min-w-[44px] min-h-[44px]"
      >
        ‹
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll("right")}
        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-600 p-2 sm:p-3 rounded-full z-10 touch-manipulation min-w-[44px] min-h-[44px]"
      >
        ›
      </motion.button>

      <div ref={containerRef} className="flex gap-4 overflow-hidden px-8 sm:px-10">
        {projects.map((project, index) => (
          <div key={index} className="relative flex-shrink-0 w-[260px] sm:w-[300px] h-[400px] sm:h-[450px]">
            {hoverIndex === index && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl opacity-20 pointer-events-none"></div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="w-full h-full bg-white/10 rounded-xl p-3 sm:p-4 cursor-pointer flex flex-col"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-32 sm:h-40 w-full object-cover rounded-lg mb-3 sm:mb-4 flex-shrink-0"
              />
              <h3 className="text-base sm:text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 flex-grow leading-relaxed">
                {project.description}
              </p>
              <p className="text-xs mt-2 text-gray-300">{project.tech}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 sm:mt-4 text-cyan-300 hover:text-cyan-200 text-xs sm:text-sm font-semibold"
              >
                View on GitHub →
              </a>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
