import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f1a] border-t border-pink-500 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h4 className="text-lg font-semibold text-pink-400">
          Designed & Built by <span className="text-pink-500">Praatishthaa Goyal</span>
        </h4>

        <div className="flex justify-center mt-4 gap-6 text-2xl text-pink-300">
          <a
            href="https://github.com/praatishthaa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-transform hover:-translate-y-1"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/praatishthaa-goyal"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-transform hover:-translate-y-1"
          >
            <FaLinkedin />
          </a>
         <a href="mailto:praatishthaagoyal126@gmail.com" className="hover:text-indigo-500 transition transform hover:-translate-y-1">
  <FaEnvelope />
</a>

        </div>

        <p className="mt-6 text-sm text-pink-200">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
