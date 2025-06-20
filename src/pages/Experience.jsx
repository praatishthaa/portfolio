import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaCodeBranch, FaTools, FaRocket } from 'react-icons/fa';

const Experience = () => {
  return (
    <section
      id="experience"
      className="min-h-screen px-6 py-20 bg-[#0f0f1a] text-white flex flex-col items-center scroll-mt-20"
    >
      <motion.h2
        className="text-4xl font-bold text-pink-500 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">

        {/* 🔬 SkillCraft */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gray-900 border border-pink-500 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaLaptopCode className="text-pink-400 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-pink-300">Machine Learning Intern</h3>
              <p className="text-sm text-gray-400">SkillCraft Technology · Remote · Jun 2025 – Present</p>
            </div>
          </div>
          <ul className="list-disc list-inside text-pink-100 space-y-2 text-sm md:text-base">
            <li>Built K-Means clustering model for customer segmentation.</li>
            <li>Worked with Python, Pandas, Scikit-learn, and Seaborn.</li>
            <li>Optimized model performance and documented findings.</li>
          </ul>
        </motion.div>

        {/* 🧱 PG Tech Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-900 border border-pink-500 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaCodeBranch className="text-pink-400 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-pink-300">Full Stack Trainee</h3>
              <p className="text-sm text-gray-400">PG Tech Solutions · Mohali · Jun – Jul 2025</p>
            </div>
          </div>
          <ul className="list-disc list-inside text-pink-100 space-y-2 text-sm md:text-base">
            <li>Hands-on MERN stack development (MongoDB, Express, React, Node).</li>
            <li>Built scalable full-stack apps and REST APIs.</li>
            <li>Collaborated in weekly code reviews and mentorship sessions.</li>
          </ul>
        </motion.div>

        {/* 🛠️ Placeholder 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-900 border border-pink-500 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaTools className="text-pink-400 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-pink-300">Frontend Intern</h3>
              <p className="text-sm text-gray-400">SavvyZi ·  Remote · Dec 2024 – Feb 2025</p>
            </div>
          </div>
          <ul className="list-disc list-inside text-pink-100 space-y-2 text-sm md:text-base">
            <li>Built 10+ responsive components in React + Tailwind.</li>
            <li>Optimized load times and improved UX across devices.</li>
            <li>Worked with designers to polish UI/UX workflows.</li>
          </ul>
        </motion.div>

        {/* 🧠 Micro IT */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
  className="bg-gray-900 border border-pink-500 rounded-xl p-6 shadow-lg"
>
  <div className="flex items-center gap-4 mb-4">
    <FaRocket className="text-pink-400 text-3xl" />
    <div>
      <h3 className="text-xl font-semibold text-pink-300">AI/ML Intern</h3>
      <p className="text-sm text-gray-400">Micro IT · Remote · Apr – May 2025</p>
    </div>
  </div>
  <ul className="list-disc list-inside text-pink-100 space-y-2 text-sm md:text-base">
    <li>
      Built and optimized a machine learning model with <span className="text-white font-semibold">87% accuracy</span> on real-world data.
    </li>
    <li>
      Improved baseline performance by 15% using <span className="text-white">hyperparameter tuning</span>.
    </li>
    <li>
      Boosted model inference speed by 30% via vectorization and efficient coding with <span className="text-white">Git + Jupyter Notebooks</span>.
    </li>
  </ul>
</motion.div>

      </div>
    </section>
  );
};

export default Experience;
