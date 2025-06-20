import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Python',
  'C++',
  'Java',
  'C',
  'JavaScript',
  'Data Structures',
  'Algorithms',
  'Object-Oriented Programming (OOP)',
  'Git',
  'GitHub',
  'HTML',
  'CSS',
  'React',
  'Bootstrap',
  'VS Code',
  'Figma',
  'Canva',
  'HTML/CSS',
  'Vercel',
  'Communication',
  'Time Management',
  'Team Collaboration',
  'Problem Solving',
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-20 bg-[#0f0f1a] text-white flex flex-col justify-center items-center scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl text-center"
      >
        <h2 className="text-4xl font-bold text-pink-500 mb-12">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="bg-[#1a1a2e] text-pink-300 py-3 px-4 rounded-xl shadow hover:shadow-pink-400 hover:text-white transition"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
