import React from 'react';

import { FaHammer, FaLaptop, FaPhoneAlt, FaPaintRoller, FaUtensils, FaPenNib } from 'react-icons/fa';

const JobCategories = () => {
  const categories = [
    { icon: <FaHammer className="text-4xl text-blue-500" />, title: "Construction & Handyman", description: "Jobs for builders, carpenters, and general repairs." },
    { icon: <FaLaptop className="text-4xl text-green-500" />, title: "Virtual Assistance", description: "Remote jobs for administrative support and personal assistance." },
    { icon: <FaPhoneAlt className="text-4xl text-yellow-500" />, title: "Customer Support", description: "Work from home providing customer service and support." },
    { icon: <FaPaintRoller className="text-4xl text-indigo-500" />, title: "Painting & Decoration", description: "Interior and exterior painting jobs, as well as decoration services." },
    { icon: <FaPenNib className="text-4xl text-red-500" />, title: "Content Creation & Writing", description: "Opportunities in writing, blogging, and content creation." },
    { icon: <FaUtensils className="text-4xl text-purple-500" />, title: "Catering & Food Services", description: "Jobs for cooks, waitstaff, and catering gigs for events." },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Job Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded shadow-lg text-center">
              <div className="flex justify-center items-center mb-2">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;



  