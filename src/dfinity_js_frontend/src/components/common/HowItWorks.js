import React from 'react';

import { FaUserPlus, FaUserEdit, FaSearch, FaMoneyBillWave } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    { icon: <FaUserPlus className="text-4xl text-blue-500" />, title: "Sign Up", description: "Create an account and join the platform." },
    { icon: <FaUserEdit className="text-4xl text-green-500" />, title: "Build Your Profile", description: "Showcase your skills and experience." },
    { icon: <FaSearch className="text-4xl text-yellow-500" />, title: "Find Jobs", description: "Browse jobs and find opportunities that suit you." },
    { icon: <FaMoneyBillWave className="text-4xl text-indigo-500" />, title: "Get Paid", description: "Complete jobs and receive payments securely." },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white rounded shadow-lg text-center">
              <div className="flex justify-center items-center mb-2">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


  