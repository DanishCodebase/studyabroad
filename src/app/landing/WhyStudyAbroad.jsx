import React, { useState } from 'react';
import whyStudyUK from "../../assets/WhyStudy.webp";

// SVG Icons as components for better reusability
const Icons = {
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Graduation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Award: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Support: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Visa: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <line x1="7" y1="8" x2="17" y2="8"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
      <line x1="7" y1="16" x2="13" y2="16"/>
    </svg>
  ),
  Life: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
};

const studyAbroadData = {
  UK: {
    image: whyStudyUK,
    alt: "Big Ben and Houses of Parliament, London",
    benefits: [
      {
        icon: <Icons.Building />,
        title: "Home to Top 1% Universities",
        description: "in the World"
      },
      {
        icon: <Icons.Globe />,
        title: "World-renowned Education",
        description: "& value for Money"
      },
      {
        icon: <Icons.Book />,
        title: "Full-time Master Degree",
        description: "in 1 Year"
      },
      {
        icon: <Icons.Graduation />,
        title: "Two Years Post Study",
        description: "Work Permit"
      },
      {
        icon: <Icons.Briefcase />,
        title: "Work Part-time 20",
        description: "Hours/week while Studying"
      },
      {
        icon: <Icons.Award />,
        title: "Scholarships",
        description: "Available"
      },
      {
        icon: <Icons.Star />,
        title: "Globally Recognized",
        description: "Qualifications"
      },
      {
        icon: <Icons.Users />,
        title: "Work",
        description: "Opportunities"
      },
      {
        icon: <Icons.Support />,
        title: "Support Services for",
        description: "International Students"
      },
      {
        icon: <Icons.Visa />,
        title: "Easier to obtain",
        description: "Student Visa"
      },
      {
        icon: <Icons.Life />,
        title: "Best Quality of",
        description: "Student Life"
      },
      {
        icon: <Icons.MapPin />,
        title: "Internships & Job",
        description: "Placements Opportunities"
      }
    ]
  },
  Australia: {
    image: whyStudyUK,
    alt: "Sydney Opera House, Australia",
    benefits: [
      {
        icon: <Icons.Building />,
        title: "World-Class Universities",
        description: "Globally Recognized"
      },
      {
        icon: <Icons.Globe />,
        title: "Vibrant Multiculturalism",
        description: "Diverse & Welcoming"
      },
      {
        icon: <Icons.Star />,
        title: "Unique Wildlife & Nature",
        description: "Explore the Outdoors"
      },
      {
        icon: <Icons.Graduation />,
        title: "Post-Study Work Visa",
        description: "Up to 4 Years"
      },
      {
        icon: <Icons.Briefcase />,
        title: "Numerous Job Opportunities",
        description: "During & After Studies"
      },
      {
        icon: <Icons.Award />,
        title: "Generous Scholarships",
        description: "For International Students"
      },
      {
        icon: <Icons.Book />,
        title: "Flexible Study Options",
        description: "Tailor Your Education"
      },
      {
        icon: <Icons.Users />,
        title: "Friendly & Safe",
        description: "Communities"
      },
      {
        icon: <Icons.Support />,
        title: "Strong Student Support",
        description: "Services Available"
      },
      {
        icon: <Icons.Visa />,
        title: "Streamlined Visa Process",
        description: "For Students"
      },
      {
        icon: <Icons.Life />,
        title: "High Standard of Living",
        description: "Quality Lifestyle"
      },
      {
        icon: <Icons.MapPin />,
        title: "Internship Opportunities",
        description: "Gain Practical Experience"
      }
    ]
  },
  Canada: {
    image: whyStudyUK,
    alt: "CN Tower, Toronto, Canada",
    benefits: [
      {
        icon: <Icons.Building />,
        title: "Top-Ranked Education",
        description: "Affordable & High-Quality"
      },
      {
        icon: <Icons.Globe />,
        title: "Safe and Peaceful Society",
        description: "Welcoming Environment"
      },
      {
        icon: <Icons.Users />,
        title: "Multicultural Diversity",
        description: "Inclusive Communities"
      },
      {
        icon: <Icons.Graduation />,
        title: "Post-Graduation Work Permit",
        description: "Pathway to PR"
      },
      {
        icon: <Icons.Briefcase />,
        title: "Co-op & Internship Programs",
        description: "Gain Work Experience"
      },
      {
        icon: <Icons.Award />,
        title: "Scholarships for Students",
        description: "Various Options"
      },
      {
        icon: <Icons.Book />,
        title: "Bilingual Country",
        description: "English & French"
      },
      {
        icon: <Icons.Star />,
        title: "High Quality of Life",
        description: "Globally Recognized"
      },
      {
        icon: <Icons.Support />,
        title: "Excellent Student Support",
        description: "Services for Everyone"
      },
      {
        icon: <Icons.Visa />,
        title: "Clear Path to Immigration",
        description: "Post-Graduation"
      },
      {
        icon: <Icons.Life />,
        title: "Stunning Natural Beauty",
        description: "Explore the Landscape"
      },
      {
        icon: <Icons.MapPin />,
        title: "Research Opportunities",
        description: "Innovate and Discover"
      }
    ]
  },
  USA: {
    image: whyStudyUK,
    alt: "Golden Gate Bridge, San Francisco, USA",
    benefits: [
      {
        icon: <Icons.Building />,
        title: "Leading Universities",
        description: "Excellence in Education"
      },
      {
        icon: <Icons.Globe />,
        title: "Cultural Diversity",
        description: "Experience a Melting Pot"
      },
      {
        icon: <Icons.Star />,
        title: "Innovation & Research Hub",
        description: "Cutting-Edge Opportunities"
      },
      {
        icon: <Icons.Graduation />,
        title: "Optional Practical Training",
        description: "Work Experience (OPT)"
      },
      {
        icon: <Icons.Briefcase />,
        title: "Flexible Academic System",
        description: "Customize Your Learning"
      },
      {
        icon: <Icons.Award />,
        title: "Financial Aid & Scholarships",
        description: "Support for Students"
      },
      {
        icon: <Icons.Book />,
        title: "Vibrant Campus Life",
        description: "Active & Engaging"
      },
      {
        icon: <Icons.Users />,
        title: "Global Networking",
        description: "Connect with Peers"
      },
      {
        icon: <Icons.Support />,
        title: "Comprehensive Support",
        description: "For International Students"
      },
      {
        icon: <Icons.Visa />,
        title: "F1 Visa Opportunities",
        description: "For Students"
      },
      {
        icon: <Icons.Life />,
        title: "Diverse Landscapes",
        description: "From Cities to Nature"
      },
      {
        icon: <Icons.MapPin />,
        title: "Career Advancement",
        description: "Internships & Jobs"
      }
    ]
  }
};


const WhyStudyAbroad = () => {
  const [activeTab, setActiveTab] = useState('UK');
  const activeData = studyAbroadData[activeTab];

  return (
    <section className="w-full bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-[#A94442]">
          Why Study Abroad
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12 border-b-2 border-gray-200">
          {Object.keys(studyAbroadData).map((country) => (
            <button
              key={country}
              onClick={() => setActiveTab(country)}
              className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium transition-colors duration-300 focus:outline-none ${
                activeTab === country
                  ? 'border-b-2 border-[#C17F59] text-[#C17F59]'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left side - Image */}
          <div className="w-full lg:w-5/12">
            <div className="relative scale-[0.95] z-0 sm:w-[630px] h-[300px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={activeData.image}
                alt={activeData.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Benefits Grid */}
          <div className="w-full relative z-10 lg:w-7/12">
            <div className="bg-gray-50 shadow-xl rounded-3xl p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {activeData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
                  >
                    <div className="text-[#C17F59] mb-3">
                      {benefit.icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStudyAbroad; 