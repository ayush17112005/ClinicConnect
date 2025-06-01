import { CalendarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
export const NoAppointment = () => {
  const noAppointmentMessages = [
    "Your schedule is wide open! Time to book a check-up?",
    "No appointments yet? Let's get you on the calendar!",
    "Health first! Schedule your next visit now.",
    "Your calendar is clear. How about a wellness check?",
    "No upcoming appointments. Stay proactive with your health!",
  ];
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden">
      {/* Background with vibrant gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 opacity-10 rounded-2xl"></div>

      {/* Main container with border glow effect */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-indigo-200 p-6">
        {/* Animated shapes in background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full -mr-20 -mt-20 "></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400  rounded-full -ml-16 -mb-16"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-red-400 opacity-6 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-blue-400 opacity-7 rounded-full"></div>

        {/* Zigzag top decorative border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="flex flex-col items-center justify-center py-8 relative z-10">
          {/* Calendar icon with enhanced effects */}
          <div className="relative mb-8 group">
            {/* Outer glow effect */}
            <div className="absolute -inset-4 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-700 animate-pulse"></div>

            {/* Icon container with hover effect */}
            <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-full shadow-lg relative transform group-hover:scale-110 transition-all duration-300">
              <CalendarIcon className="h-12 w-12 text-blue-600" />

              {/* Animated notification dot */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Catchy random message */}
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4 text-center max-w-md leading-tight">
            {
              noAppointmentMessages[
                Math.floor(Math.random() * noAppointmentMessages.length)
              ]
            }
          </h2>

          {/* quote */}
          <div className="relative max-w-lg mb-8 py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
            <div className="overflow-hidden h-30">
              <p className="text-blue-800 font-medium italic">
                "Good health is the real wealth we keep,
                <br />
                A strong body lets the mind run deep.
                <br />
                One check-up can change the game,
                <br />
                Stay ahead—health's not a name, it's fame!"
              </p>
            </div>
          </div>

          {/* Pulsing action button */}
          <button
            onClick={() => navigate("/doctors")}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 overflow-hidden"
          >
            {/* Inner light effect */}
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

            <span className="relative flex items-center justify-center">
              <span>Book Your Appointment</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </span>
          </button>

          {/* Health stats with counters */}
          <div className="mt-12 w-full max-w-2xl grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
              <div
                className="text-blue-600 font-bold text-2xl mb-1 counter"
                data-target="95"
              >
                95%
              </div>
              <p className="text-xs text-center text-blue-800">
                Prevention Success Rate
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
              <div
                className="text-green-600 font-bold text-2xl mb-1 counter"
                data-target="24"
              >
                24/7
              </div>
              <p className="text-xs text-center text-green-800">
                Care Available
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
              <div
                className="text-purple-600 font-bold text-2xl mb-1 counter"
                data-target="100"
              >
                100%
              </div>
              <p className="text-xs text-center text-purple-800">
                Patient Satisfaction
              </p>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="flex justify-center mt-8 gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
