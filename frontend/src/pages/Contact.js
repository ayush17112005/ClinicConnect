import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold relative inline-block">
          CONTACT <span className="text-primary">US</span>
          <div className="h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></div>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20 max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 overflow-hidden">
          <img
            className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
            src={assets.contact_image}
            alt="Contact Us"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col items-start gap-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-xl text-gray-700 mb-2">
              OUR OFFICE
            </h3>
            <p className="text-gray-600">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="bg-gray-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Phone</p>
              <p className="text-gray-600">(415) 555-0132</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="bg-gray-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Email</p>
              <p className="text-gray-600">saxenaayushman99@gmail.com</p>
            </div>
          </div>

          <div className="w-full mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-xl text-gray-700 mb-2">
              Careers at PRESCRIPTO
            </h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="border-2 border-primary px-8 py-3 text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-white rounded hover:shadow-md">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
