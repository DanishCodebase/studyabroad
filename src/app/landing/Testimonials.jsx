import React, { useState, useEffect } from "react";
import hemanth from "../../assets/hemanth.jpg";
import prachit from "../../assets/Prachit.png";
import smit from "../../assets/Smit.png";
import pramash from "../../assets/Pramash.png";

const testimonials = [
  {
    id: 1,
    name: "Hemanth Rajkumar",
    image: hemanth,
    text: "Planet Education would be your right choice to go to if you want a hassle-free and continuous update on your application. I had nothing to worry about except to get the required documents. ow I am a student at UTS, Sydney doing my Masters in Marketing and all the credit goes to Mr.Vasantosh and his team.",
    university: "UTS, Sydney",
    course: "Masters in Marketing",
  },
  {
    id: 2,
    name: "Prachit Desai",
    image: prachit,
    text: "I got admission in Campus Coventry with the progression degree of Bsc Honors of Aviation Management. In the help of Urvi ma'am, Monal ma'am & all the other staff, I didn't face any problem with Visa and admission process. I am very proud to say that I got my visa in just 64 hours.",
    university: "Campus Coventry",
    course: "BSc Honors in Aviation Management",
  },
  {
    id: 3,
    name: "Smit Shah",
    image: smit,
    text: "So the process started back in January when I started my search for Overseas Education consultancy and my friend recommended me Planet Education, so then after I took the counseling, and I selected Griffith University. It took time to get my COE but the counselor was pretty confident and I received my COE and the entire process went smooth.",
    university: "Griffith University",
    course: "",
  },
  {
    id: 4,
    name: "Pramash Panchal",
    image: pramash,
    text: "Hi, my name is Pramash Panchal and Thanks to the whole team for the right guidance because of which I got my admission in Canada. I have visited many consultancies but found planet education to be the best as their team is indeed helpful and provide the best guidance. Thanks to their team that I got my visa in just 15 days.",
    university: "Canada",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section className="relative h-[1000px] sm:h-auto pb-16 md:pb-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"
        style={{ filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Hear From Our Students
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our students achieved their academic dreams with our
            support and guidance
          </p>
        </div>

        <div className="relative py-28 w-full max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute my-52 sm:my-0 px-5 w-full transition-all duration-500 ease-in-out ${
                index === activeIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
              style={{
                transform: `translate(${(index - activeIndex) * 100}%, -50%)`,
              }}
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                  <div className="relative group">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}'s testimonial`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 drop-shadow-lg border backdrop-blur-sm rounded-2xl transform -rotate-12 transition-transform duration-300 group-hover:rotate-0" />
                    <svg
                      className="absolute top-4 right-4 w-8 h-8 text-white/80"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 21C3 16.5 6.5 13 11 13V7C5.5 7 1 11.5 1 17V21H3ZM13 21C13 16.5 16.5 13 21 13V7C15.5 7 11 11.5 11 17V21H13Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1e1b4b]">
                        {testimonial.name}
                      </h3>
                      <div className="flex flex-col md:flex-row gap-2 text-sm text-[#ffc400] font-medium">
                        <span>{testimonial.university}</span>
                        <span className="hidden md:block">•</span>
                        <span>{testimonial.course}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-[130%] sm:top-1/2 -translate-y-2/3 sm:-translate-y-1/2 -translate-x-1/2 md:-translate-x-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#f6cb3d] p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f6cb3d]/50"
            aria-label="Previous testimonial"
          >
            <svg
              className="h-3 w-3 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-[130%] sm:top-1/2 -translate-y-2/3 sm:-translate-y-1/2 translate-x-1/2 md:translate-x-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#f6cb3d] p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f6cb3d]/50"
            aria-label="Next testimonial"
          >
            <svg
              className="h-3 w-3 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Enhanced navigation dots */}
        <div className="hidden sm:flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-[#f6cb3d] w-6"
                  : "bg-[#f6cb3d]/40 hover:bg-[#f6cb3d]/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
