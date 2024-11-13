import React from 'react';

const JobRecommendations = () => {
  const jobs = [
    { title: "Front-End Developer", description: "Remote opportunity to build React applications." },
    { title: "Graphic Designer", description: "Create engaging graphics for digital marketing." },
    { title: "Blockchain Developer", description: "Build DeFi smart contracts." },
    { title: "Backend Engineer", description: "Join a dynamic team of developers to develop community-centered solutions." },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Job Recommendations</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index} className="border-b py-2">
            <h3 className="font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRecommendations;
