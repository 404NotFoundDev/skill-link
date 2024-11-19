import React from 'react';
import { FaCogs, FaGlobe, FaLock } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaCogs className="text-white text-5xl" />, 
      title: "AI-Powered Matching",
      description: "Our advanced AI system connects you to jobs that align with your skills and experience, optimizing for the best matches.",
    },
    {
      icon: <FaGlobe className="text-white text-5xl" />, 
      title: "Global Reach",
      description: "Access remote gigs from employers around the world, opening up new opportunities regardless of location.",
    },
    {
      icon: <FaLock className="text-white text-5xl" />, 
      title: "Secure Payments",
      description: "All transactions are secured through our blockchain-based payment system, ensuring fast and secure payouts.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg rounded-md text-center transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
