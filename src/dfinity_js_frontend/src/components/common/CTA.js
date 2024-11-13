
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CTA = () => (
  <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="mb-6 text-lg">Join OpnTask today and connect with opportunities around the world.</p>
      <Link href="/auth/register" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-200">
        Sign Up Now <FaArrowRight className="ml-2" />
      </Link>
    </div>
  </section>
);

export default CTA;
