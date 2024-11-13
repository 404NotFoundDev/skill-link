import React from "react";

const Testimonials = () => {
  // Example testimonials data 
  const testimonials = [
    {
      name: "Alex Weru",
      avatar: "/images/alex.jpg",
      quote: "OpnTask has been a game-changer for finding remote gigs. The platform is easy to use, and I found work within a week!",
    },
    {
      name: "Maria Ajib",
      avatar: "/images/maria.jpg",
      quote: "I was able to showcase my skills and get hired by reputable companies. I highly recommend OpnTask!",
    },
    {
      name: "Liam Muema",
      avatar: "/images/liam.jpg",
      quote: "Thanks to OpnTask, I can work from home and support my family. It's been a fantastic experience!",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {testimonials.map((testimonial, idx) => (
            <blockquote 
              key={idx} 
              className="border border-blue-500 p-6 bg-gray-50 rounded-md w-full md:w-1/3 text-center"
            >
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}'s avatar`}
                width={200} 
                height={200} 
                className="mx-auto rounded-full mb-4"
              />
              <p className="italic text-gray-800 mb-4">“{testimonial.quote}”</p>
              <footer className="text-blue-500 font-semibold">{testimonial.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
