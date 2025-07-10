import React from "react";
import study from "../../assets/Study.png";
import Birmingham from "../../assets/Birmingham.svg";
import Chester from "../../assets/Chester.svg";
import Coventry from "../../assets/Coventry.svg";
import Cranfield from "../../assets/Cranfield.svg";
import Derby from "../../assets/Derby.svg";
import Middlesex from "../../assets/Middlesex.webp";
import britishcolumbia from "../../assets/british-columbia.png";
import mcgill from "../../assets/mcgill.png";
import Montreal from "../../assets/MontrealUniversity.png";
import Queens from "../../assets/QueensUniversity.svg";
import Toronto from "../../assets/toronto.svg";
import western from "../../assets/western-university.svg";
import melbourne from "../../assets/melbourne-university.png";
import sydney from "../../assets/sydney-university.png";
import unsw from "../../assets/unsw.png";
import queensland from "../../assets/queensland.png";
import monash from "../../assets/monash.svg";
// import Northumbria from "../../assets/Northumbria.svg";
// import Plymouth from "../../assets/Plymouth.svg";
// import Roehampton from "../../assets/Roehampton.svg";
// import Solent from "../../assets/Solent.svg";
// import Southampton from "../../assets/Southampton.svg";
// import Starthclyde from "../../assets/Starthclyde.jpg";
// import Studygroup from "../../assets/Studygroup.svg";
// import TCD from "../../assets/TCD.png";
// import Ulaw from "../../assets/Ulaw.svg";
// import Ulster from "../../assets/Ulster.png";
// import Winchester from "../../assets/Winchester.svg";

const UniversityShowcase = () => {
  const universities = [
    { name: "University College Birmingham", image: Birmingham },
    { name: "University of Chester", image: Chester },
    { name: "Coventry University", image: Coventry },
    { name: "Cranfield University", image: Cranfield },
    { name: "University of Derby", image: Derby },
    { name: "Middlesex University", image: Middlesex },
    { name: "British Columbia", image: britishcolumbia },
    { name: "McGill University", image: mcgill },
    { name: "Montreal University", image: Montreal },
    { name: "Queens University", image: Queens },
    { name: "Toronto University", image: Toronto },
    { name: "Western University", image: western },
    { name: "Melbourne University", image: melbourne },
    { name: "Sydney University", image: sydney },
    { name: "UNSW", image: unsw },
    { name: "Queensland University", image: queensland },
    { name: "Monash University", image: monash },
    // { name: "Northumbria University", image: Northumbria },
    // { name: "University of Plymouth", image: Plymouth },
    // { name: "University of Roehampton", image: Roehampton },
    // { name: "Solent University", image: Solent },
    // { name: "University of Southampton", image: Southampton },
    // { name: "University of Strathclyde", image: Starthclyde },
    // { name: "Study Group", image: Studygroup },
    // { name: "Trinity College Dublin", image: TCD },
    // { name: "The University of Law", image: Ulaw },
    // { name: "Ulster University", image: Ulster },
    // { name: "University of Winchester", image: Winchester },
  ];

  // Duplicate universities for smooth looping

  const firstGroup = universities.slice(0, 6);
  const secondGroup = universities.slice(6, 12);
  const thirdGroup = universities.slice(12);

  const duplicatedUniversities = [...firstGroup, ...firstGroup];
  const duplicatedUniversities2 = [...secondGroup, ...secondGroup];
  const duplicatedUniversities3 = [...thirdGroup, ...thirdGroup];
  return (
    <div className="flex justify-center items-center pt-16 bg-white p-4">
      <div className="relative w-full max-w-[1200px] bg-[#B12830] rounded-3xl px-4 sm:px-8 py-8">
        <h2 className="text-[#F7CB3B] text-3xl md:text-5xl font-bold text-center mb-8">
          Our Students Studying at
        </h2>

        <div className="relative overflow-hidden space-y-4 max-w-[800px]">
          <div className="scroll-container h-fit flex sm:gap-4 animate-marquee">
            {duplicatedUniversities.map((university, index) => (
              <div
                key={`${university.name}-${index}`}
                className="bg-white hover:-translate-y-1 hover:scale-105 transition-all duration-300 p-3 flex items-center justify-center h-16 sm:h-24 min-w-[200px] sm:min-w-[250px]"
              >
                <img
                  src={university.image}
                  alt={university.name}
                  className="max-h-12 sm:max-h-20 object-contain"
                />
              </div>
            ))}
            <div className="bg-white h-fit p-4 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center min-w-[250px]">
              <span className="text-gray-800 text-lg">&amp; many more..</span>
            </div>
          </div>
          <div className="scroll-container-inverse flex sm:gap-4 animate-marquee-inverse">
            {duplicatedUniversities2.map((university, index) => (
              <div
                key={`${university.name}-${index}`}
                className="bg-white hover:-translate-y-1 hover:scale-105 transition-all duration-300 p-3 flex items-center justify-center h-16 sm:h-24 min-w-[200px] sm:min-w-[250px]"
              >
                <img
                  src={university.image}
                  alt={university.name}
                  className="max-h-12 sm:max-h-20 object-contain"
                />
              </div>
            ))}
            <div className="bg-white p-4 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center h-fit min-w-[250px]">
              <span className="text-gray-800 text-lg">&amp; many more..</span>
            </div>
          </div>
          <div className="scroll-container flex sm:gap-4 animate-marquee">
            {duplicatedUniversities3.map((university, index) => (
              <div
                key={`${university.name}-${index}`}
                className="bg-white hover:-translate-y-1 hover:scale-105 transition-all duration-300 p-3 flex items-center justify-center h-16 sm:h-24 min-w-[200px] sm:min-w-[250px]"
              >
                <img
                  src={university.image}
                  alt={university.name}
                  className="max-h-12 sm:max-h-20 object-contain"
                />
              </div>
            ))}
            <div className="bg-white p-4 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center h-fit min-w-[250px]">
              <span className="text-gray-800 text-lg">&amp; many more..</span>
            </div>
          </div>
        </div>

        {/* Person image */}
        <div className="absolute -right-[86px] top-[42.4%] transform -translate-y-1/2 hidden lg:block">
          <img
            src={study}
            alt="Education Consultant"
            className="h-[520px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityShowcase;
