import React from 'react';

const ProjectCard = ({ title, description, tech, githubLink, liveLink }) => {
  return (
    <div className="relative bg-[#1a1a2e] border border-pink-500 rounded-2xl shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-pink-400 text-white">
      <h3 className="text-2xl font-semibold text-pink-300 mb-2">{title}</h3>
      <p className="text-pink-100">{description}</p>
      <p className="text-sm text-pink-200 mt-2 italic">
        🛠️ <span className="font-medium">Tech:</span> {tech}
      </p>

      <div className="flex gap-4 mt-4">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-full transition"
          >
            GitHub
          </a>
        )}
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full transition"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
