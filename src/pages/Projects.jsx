import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-purple-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ProjectCard
            title="WayFare"
            description="AI-powered travel itinerary generator using OpenAI’s GPT API. Dynamically suggests location-based activities with added features like safety tips and budget tracking."
            tech="React, Tailwind, GPT API"
            githubLink="https://github.com/praatishthaa/wayfare"
            liveLink="#"
          />
          {/* Add more <ProjectCard />s as needed */}
        </div>
      </div>



      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ProjectCard
            title="VaayuFlo AI"
            description="VaayuFlow AI delivers real-time and predictive air quality insights tailored for rural and small-town India. Built using React and geolocation tech, it visualizes granular AQI data through interactive maps and charts."
            tech="React, Tailwind CSS, Recharts, Geolocation API, and Leaflet"
            githubLink="https://github.com/praatishthaa/VaayuFlowAI"
            liveLink="https://vaayuflow-ai.vercel.app/"
          />
          {/* Add more <ProjectCard />s as needed */}
        </div>
      </div>


       <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ProjectCard
            title="Nourivo"
            description="Nourivo is a fitness-for-impact platform that tracks steps via Google Fit and donates a meal for every 10,000 steps. Users earn milestone badges, while NGOs handle real-time donation logistics."
            tech="React, Tailwind CSS, Google Fit API, Firebase"
            githubLink="https://github.com/praatishthaa/Nourivo"
            liveLink="https://nourivo.vercel.app/"
          />
          {/* Add more <ProjectCard />s as needed */}
        </div>
      </div>
    </section>

    


  );
};

export default Projects;
