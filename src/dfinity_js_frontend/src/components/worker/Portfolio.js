import React, { useState } from 'react';

const Portfolio = () => {
  const [projects, setProjects] = useState([
    { title: "Project 1", description: "A sample project", media: "image1.jpg" },
    { title: "Project 2", description: "Another sample project", media: "image2.jpg" },
  ]);

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">{project.title}</h3>
            <p>{project.description}</p>
            <img src={`/images/${project.media}`} alt={project.title} className="mt-2 rounded" />
          </div>
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add New Project
      </button>
    </div>
  );
};

export default Portfolio;
