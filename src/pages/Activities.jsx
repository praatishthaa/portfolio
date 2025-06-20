import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  {
    title: '🎯 Electrothon 7.0 – Hackathon',
    subtitle: 'NIT Hamirpur, Feb 2025',
    description:
      'Built an AI-powered travel planner in 24 hrs with a team of 4. Coded like crazy, slept never, vibed endlessly.',
  },
  {
    title: '🥈 Inter-College Youth Festival',
    subtitle: 'Debate Winner, 2024',
    description:
      'First female to win both silver & bronze medals in debate. Roasted everyone respectfully 🔥',
  },
];

const Activities = () => {
  return (
    <section
      id="activities"
      className="min-h-screen px-6 py-20 bg-[#0f0f1a] text-white flex flex-col justify-center items-center scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl w-full text-center"
      >
        <h2 className="text-4xl font-bold text-pink-500 mb-12">Activities</h2>

        <div className="space-y-10">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#1a1a2e] border border-pink-400 rounded-xl p-6 shadow-md hover:shadow-pink-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-pink-300">
                {item.title}
              </h3>
              <p className="text-sm italic text-pink-200 mt-1">
                {item.subtitle}
              </p>
              <p className="mt-4 text-pink-100">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Activities;
