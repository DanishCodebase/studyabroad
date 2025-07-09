import React, { useState } from "react";

const HeroSection = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add validation functions
  const validateName = (value) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePhone = (value) => {
    return /^[6-9]\d{9}$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;
    const city = form.elements.city.value;

    if (!validateName(name)) {
      setMessage("Please enter a valid name (letters only)");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    if (!validateName(city)) {
      setMessage("Please enter a valid city name (letters only)");
      return;
    }

    setMessage("Submitting...");
    setIsSubmitting(true);

    const data = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      educationlevel: form.elements.educationlevel.value,
      languagetest: form.elements.languagetest.value,
    };

    // Send a POST request to your PHP script
    fetch("https://www.nocolleges.com/submit1.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setMessage(result.message || "Data submitted successfully!");
          form.reset();
        } else {
          setMessage(result.message || "An error occurred.");
        }
        setIsSubmitting(false);

        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        setMessage("A network error occurred while submitting the form.");
        setIsSubmitting(false);
      });
  };

  return (
    <main className="container mx-auto max-w-7xl px-5 py-4 sm:py-8 flex flex-col text-center sm:text-left md:flex-row gap-0 items-center md:items-start justify-between">
      {/* Left Content */}
      <div className="space-y-6 text-center mt-7 mb-10 sm:mb-0 sm:mt-20 lg:text-left">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-[24px] leading-7 sm:text-5xl !font-light text-white">
            Planning to
            <div className="text-[40px] text-center sm:text-left sm:text-[86px] leading-[1]">
              Study Abroad?
            </div>
            {/* <div className="text-[40px] text-center sm:text-left sm:text-[86px] leading-[1]">
              Study in the UK?
            </div> */}
          </h1>
          <div className="bg-[#f6313f] animate-pulse text-white text-xl sm:text-5xl font-light py-2 px-4 inline-block rounded-sm">
            Apply for Upcoming Intakes 
          </div>
          <br />
          <div className="bg-[#f6313f] animate-pulse text-white text-xl sm:text-5xl font-light py-2 px-4 inline-block rounded-sm">
            with Planet Education
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div
        id="apply-now"
        className="bg-gradient-to-br from-[#f6cb3d] to-[#f6cb3d]/90 p-6 !pt-14 shadow-xl max-w-[400px] custom-div rounded-sm"
      >
        <div className="relative">
          <h3 className="text-lg sm:text-xl text-center font-bold text-black">
            Sign-up to choose your best-fit
          </h3>
          <h3 className="text-lg sm:text-xl text-center font-bold text-black">
            university or college with our
          </h3>
          <h3 className="text-lg sm:text-xl text-center font-bold text-black mb-6">
            expert counselors.
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              className="w-full bg-white p-2"
              required
              pattern="[A-Za-z\s]+"
              title="Please enter only letters and spaces"
              onChange={(e) => {
                if (!validateName(e.target.value)) {
                  e.target.setCustomValidity(
                    "Please enter only letters and spaces"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
            />
            <input
              placeholder="Email"
              name="email"
              type="email"
              className="w-full bg-white p-2"
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="Please enter a valid email address"
            />
            <input
              placeholder="Phone Number"
              name="phone"
              type="tel"
              className="w-full bg-white p-2"
              required
              pattern="[6-9][0-9]{9}"
              title="Please enter a valid 10-digit Indian mobile number"
              maxLength="10"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            <input
              name="city"
              placeholder="City"
              className="w-full bg-white p-2"
              required
              pattern="[A-Za-z\s]+"
              title="Please enter only letters and spaces"
              onChange={(e) => {
                if (!validateName(e.target.value)) {
                  e.target.setCustomValidity(
                    "Please enter only letters and spaces"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
            />
            <select
              name="educationlevel"
              className="w-full bg-white p-2"
              required
            >
              <option value="" disabled selected>
                Current Level of Education
              </option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
            {/* <select name="Preferred Study Level" className="w-full bg-white p-2" required>
              <option value="" disabled selected>
                Prefered Study Level
              </option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="PhD">PhD</option>
            </select> */}
            <select
              name="languagetest"
              className="w-full bg-white p-2"
              required
            >
              <option value="" disabled selected>
                Any Language Test Taken?
              </option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="PTE">PTE</option>
              <option value="Duolingo">Duolingo</option>
              <option value="Others">Others</option>
              <option value="None">None</option>
            </select>
            <button
              type="submit"
              className="px-10 rounded-sm py-2 block mx-auto bg-[#1a237e] hover:bg-[#1a237e]/90 text-white  text-[1.4rem] font-normal animate-bounce"
              style={{ marginTop: "2.5rem" }}
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
