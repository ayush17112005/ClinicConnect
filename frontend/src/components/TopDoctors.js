import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const totalDoctors = doctors.length;

  // Determine the initial count (either max 10 or all if <= 10)
  const [visibleCount, setVisibleCount] = useState(Math.min(10, totalDoctors));

  // Function to show more doctors
  const showMore = () => {
    if (visibleCount + 5 >= totalDoctors) {
      setVisibleCount(totalDoctors);
    } else {
      setVisibleCount((prev) => prev + 5);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-auto gap-4 pt-5 px-3 sm:px-0">
        {doctors.slice(0, visibleCount).map((doctor, index) => (
          <Card key={index} doctor={doctor} />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        {visibleCount < totalDoctors ? (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-500 active:scale-90"
            onClick={showMore}
          >
            {visibleCount + 5 > totalDoctors ? "View All Doctors" : "Show More"}
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-500 active:scale-90"
            onClick={() => {
              navigate("/doctors");
            }}
          >
            View All Doctors
          </button>
        )}
      </div>
    </div>
  );
};

export default TopDoctors;
