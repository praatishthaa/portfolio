import React from 'react';

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen px-6 py-20 bg-[#0f0f1a] text-white flex flex-col justify-center items-center scroll-mt-20"
    >
      <h2 className="text-4xl font-bold text-pink-500 mb-6">Education</h2>
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-pink-300">B.Tech – Computer Science</h3>
          <p className="text-pink-200">I. K. Gujral Punjab Technical University</p>
          <p className="text-pink-400 text-sm italic">2023 – 2027 | CGPA: 9.25 (current)</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-pink-300">Class XII (ISC)</h3>
          <p className="text-pink-200">City Montessori School, Lucknow</p>
          <p className="text-pink-400 text-sm italic">2022 | Percentage: 96.5%</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-pink-300">Class X (ICSE)</h3>
          <p className="text-pink-200">City Montessori School, Lucknow</p>
          <p className="text-pink-400 text-sm italic">2020 | Percentage: 97.4%</p>
        </div>
      </div>
    </section>
  );
};

export default Education;
