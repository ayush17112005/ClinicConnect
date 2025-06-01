import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-center gap-[4px] py-[16px] text-gray-800"
    >
      <h1 className="text-3xl font-medium text-[#1F2937]">
        Find By Speciality
      </h1>
      <p className="sm:w-1/3 text-center text-sm text-[#4B5563]">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((data, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${data.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img src={data.image} alt="" className="w-16 sm:w-24 mb-2" />
            <p>{data.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
