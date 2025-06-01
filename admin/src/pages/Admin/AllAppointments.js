// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } =
//     useContext(AdminContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);
//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b-2">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Data & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {appointments.map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//             key={index}
//           >
//             <p className="max-sm:hidden">{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full"
//                 src={item.userData.image}
//                 alt=""
//               />{" "}
//               <p>{item.userData.name}</p>
//             </div>
//             <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormat(item.slotDate)}, {item.slotTime}
//             </p>
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full bg-gray-200"
//                 src={item.docData.image}
//                 alt=""
//               />{" "}
//               <p>{item.docData.name}</p>
//             </div>
//             <p>
//               {currency}
//               {item.amount}
//             </p>
//             {item.cancelled ? (
//               <p className="text-red-400 text-xs font-medium">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 text-xs font-medium">Completed</p>
//             ) : (
//               <img
//                 onClick={() => cancelAppointment(item._id)}
//                 className="w-10 cursor-pointer"
//                 src={assets.cancel_icon}
//                 alt=""
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          All Appointments
        </h1>
        <p className="text-gray-600">
          Manage and track all patient appointments
        </p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="ml-2 text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
            {appointments.length} Total Appointments
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6">
            <p className="font-semibold text-gray-700 text-center">#</p>
            <p className="font-semibold text-gray-700">Patient</p>
            <p className="font-semibold text-gray-700 text-center">Age</p>
            <p className="font-semibold text-gray-700">Date & Time</p>
            <p className="font-semibold text-gray-700">Doctor</p>
            <p className="font-semibold text-gray-700 text-center">Fees</p>
            <p className="font-semibold text-gray-700 text-center">Status</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments.map((item, index) => (
            <div
              className="group flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 items-center py-4 px-6 border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-300 hover:shadow-sm"
              key={index}
            >
              {/* Index */}
              <p className="max-sm:hidden text-gray-600 font-medium text-center">
                {index + 1}
              </p>

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {item.userData.name}
                  </p>
                </div>
              </div>

              {/* Age */}
              <div className="max-sm:hidden text-center">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                  {calculateAge(item.userData.dob)}
                </span>
              </div>

              {/* Date & Time */}
              <div className="text-gray-600">
                <div className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    {slotDateFormat(item.slotDate)}
                  </span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-blue-600 font-medium">
                    {item.slotTime}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-purple-300 transition-colors duration-300"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    Dr. {item.docData.name}
                  </p>
                </div>
              </div>

              {/* Fees */}
              <div className="text-center">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold text-sm border border-green-200">
                  {currency}
                  {item.amount}
                </span>
              </div>

              {/* Status/Actions */}
              <div className="text-center">
                {item.cancelled ? (
                  <div className="flex flex-col items-center">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold border border-red-200">
                      Cancelled
                    </span>
                  </div>
                ) : item.isCompleted ? (
                  <div className="flex flex-col items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold border border-green-200 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Completed
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="group/btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                    title="Cancel Appointment"
                  >
                    <img
                      className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 font-medium">No appointments found</p>
            <p className="text-gray-400 text-sm">
              Appointments will appear here once scheduled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
