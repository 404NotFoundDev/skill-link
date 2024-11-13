import React from 'react';

const Hero = () => (
  <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 py-20 text-white">
    <div className="container mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold">
        Welcome to OpnTask
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl">
        Connecting informal workers from emerging economies to global remote opportunities. Start your journey with OpnTask today.
      </p>
      <button
        className="mt-8 px-8 py-3 rounded-full bg-white text-blue-500 font-semibold hover:bg-blue-100 active:bg-gray-200 transition duration-200 shadow-lg"
        aria-label="Get Started"
      >
        Get Started
      </button>
    </div>
  </section>
);

export default Hero;
