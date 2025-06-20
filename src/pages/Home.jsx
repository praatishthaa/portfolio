import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profilePic from '../assets/profile.png';

const Home = () => {
  return (
      <section
  id="home"
  className="min-h-screen pt-32 scroll-mt-20 flex flex-col justify-center items-center text-center px-4 bg-[#0f0f1a]"
>

      {/* 👑 Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <img
          src={profilePic}
          alt="Praatishthaa Goyal"
          className="w-50 h-80 object-cover rounded-full border-4 border-pink-500 shadow-xl"
        />
      </motion.div>

      {/* 💬 Name + Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-pink-500">
  Praatishthaa Goyal
</h1>
<p className="mt-4 text-xl md:text-2xl font-medium text-pink-300">
  Frontend Developer | AI/ML Enthusiast | Code meets creativity
</p>

      {/* 📝 Short About */}
      <p className="mt-4 max-w-2xl text-md md:text-lg text-pink-300 leading-relaxed">
        Hey there 👋 I’m <span className="font-semibold text-white">Praatishthaa Goyal</span>, a Computer Science undergrad
        with a knack for turning pixels into perfection. From building responsive UIs
        to experimenting with AI/ML — I live at the intersection of <span className="text-pink-400 font-medium">creativity</span> and <span className="text-pink-400 font-medium">code</span>.
      </p>

      {/* 🔗 Social Links */}
      <div className="mt-6 flex gap-6 text-3xl text-pink-400">
        <a
          href="https://github.com/praatishthaa"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-transform transform hover:scale-110"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/praatishthaa-goyal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-transform transform hover:scale-110"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* 🔘 Buttons */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-pink-500 transition-all duration-300"
      >
        View My Work
      </motion.a>

      <motion.a
        href="/resume.pdf"
        download
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-4 px-6 py-3 border border-pink-500 text-pink-400 font-semibold rounded-xl hover:bg-pink-500 hover:text-white shadow-md hover:shadow-pink-400 transition-all duration-300"
      >
        Download Résumé
      </motion.a>
    </section>
  );
};

export default Home;
