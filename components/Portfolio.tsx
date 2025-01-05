"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Download, Menu, X, Linkedin, Github } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [typedText, setTypedText] = useState(""); // State for the typing effect
  const [isTypingDone, setIsTypingDone] = useState(false); // Indicates when typing is done

  const fullText = "Arjun Sharath Narayanan";

  // Typing effect for the name
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index)); // Append one character at a time
        index++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true); // Typing is complete
      }
    }, 100); // Typing speed in milliseconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const projects = [
    {
      title: "Music Library Web Application",
      description:
        "A web application to play music showcasing the react framework.",
    },
    {
      title: "Smart Parking Application",
      description:
        "A mobile application that lets you reserve your parking space using React Native.",
    },
    {
      title: "Car Brand Image Classification",
      description:
        "Various Machine Learning models used for classify cars into various brands.",
    },
    {
      title: "Piano Audio To Sheet Music Transcriber",
      description:
        "Converts piano audio to sheet music using Fast Fourier Transforms.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 font-mono relative overflow-x-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <nav className="fixed w-full z-50 bg-stone-900/80 backdrop-blur-sm border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => handleNavClick("home")}
              className="text-xl font-bold cursor-pointer hover:text-stone-400 transition-colors"
            >
              AS_
            </button>

            <div className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => handleNavClick("about")}
                className="hover:text-stone-400 transition-colors duration-200 cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("projects")}
                className="hover:text-stone-400 transition-colors duration-200 cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="hover:text-stone-400 transition-colors duration-200 cursor-pointer"
              >
                Contact
              </button>
              <button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="border border-stone-400 px-4 py-2 hover:bg-stone-800 transition-colors duration-200 cursor-pointer"
              >
                Resume <Download className="w-4 h-4 inline ml-2" />
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } border-t border-stone-800`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("projects")}
              className="block w-full text-left px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="block w-full text-left px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Resume <Download className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 pt-24">
        <section id="home" className="min-h-screen flex items-center">
          <div>
            <h1 className="text-6xl mb-4 font-bold tracking-tight">
              {typedText}
              {!isTypingDone && <span className="animate-blink">|</span>}
            </h1>
            <p className="text-2xl text-stone-400 mb-6">Developer</p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/arjun-sharath-b74305249"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-200 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/arjunsharath"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-200 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="bg-black rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-white-700 mb-6">
              I'm a full-stack developer with experience in web development,
              IoT, and ML/AI technologies. Currently pursuing my B.Tech in
              Information Technology at Rajalakshmi Engineering College, I'm
              passionate about creating innovative technology solutions and
              continuously expanding my knowledge in software engineering.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Python", "React", "NextJs", "Angular", "SQL", "Java"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-brown-100 text-white-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="bg-black rounded-lg shadow-md p-8">
            <h2 className="text-4xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-stone-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-stone-400">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="bg-black rounded-lg shadow-md p-8">
            <h2 className="text-4xl font-bold mb-8">Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-stone-400 mb-2 font-bold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-stone-800 text-stone-200 p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-stone-400 mb-2 font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-stone-800 text-stone-200 p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-stone-400 mb-2 font-bold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-stone-800 text-stone-200 p-2 rounded-md"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-stone-700 hover:bg-stone-600 text-stone-200 px-4 py-2 rounded-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
