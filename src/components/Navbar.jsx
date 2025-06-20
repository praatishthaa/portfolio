import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f0f1acc] backdrop-blur-md shadow-md border-b border-pink-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-500 tracking-wide">
          Praatishthaa
        </h1>

        <ul className="flex gap-4 md:gap-6 text-sm md:text-base font-medium text-pink-200">
  <li><a href="#home" className="hover:text-indigo-500">Home</a></li>
  <li><a href="#education" className="hover:text-indigo-500">Education</a></li>
  <li><a href="#experience" className="hover:text-indigo-500">Experience</a></li>
  <li><a href="#skills" className="hover:text-indigo-500">Skills</a></li>
  <li><a href="#projects" className="hover:text-indigo-500">Projects</a></li>
  <li><a href="#contact" className="hover:text-indigo-500">Contact</a></li>
</ul>

      </div>
    </nav>
  );
};

export default Navbar;
