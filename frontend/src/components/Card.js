import React from "react";
import { useNavigate } from "react-router";

const Card = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        window.scrollTo(0, 0);
      }}
    >
      <img className="bg-blue-50" src={doctor.image} alt={doctor.name} />
      <div className="p-4">
        <div
          className={`flex items-center gap-2 text-sm text-center ${
            doctor.available ? "text-green-500" : "text-gray-500"
          }`}
        >
          <p
            className={`w-2 h-2 ${
              doctor.available ? "bg-green-500" : "bg-gray-500"
            } rounded-full`}
          ></p>
          <p>{doctor.available ? "Available" : "Not Available"}</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
      </div>
    </div>
  );
};

export default Card;
