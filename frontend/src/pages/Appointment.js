import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState({});
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    if (doc) {
      setDocInfo(doc);
    } else {
      console.warn("Doctor not found!");
      setDocInfo({});
    }
  };

  // Generate available slots for 7 days
  const getAvailableSlot = () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;

        const slotsBooked = docInfo.slots_booked || {};
        const isSlotAvailable =
          slotsBooked[slotDate] && slotsBooked[slotDate].includes(formattedTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      if (!docSlots[slotIndex] || !docSlots[slotIndex][0]) {
        console.error("No slot selected or available");
        return;
      }

      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Book Your Appointment</h1>
            <p className="text-blue-100 text-lg">
              Professional healthcare at your convenience
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Doctor's Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Doctor Image */}
            <div className="lg:w-1/3">
              <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={docInfo.image}
                  alt={docInfo.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              {/* Doctor Name and Verification */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {docInfo.name}
                </h2>
                <img className="w-6 h-6" src={assets.verified_icon} alt="" />
              </div>

              {/* Degree and Speciality */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg text-gray-600">
                  {docInfo.degree} - {docInfo.speciality}
                </span>
                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                  {docInfo.experience}
                </span>
              </div>

              {/* About Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">About</h3>
                  <img src={assets.info_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-gray-600 leading-relaxed max-w-3xl">
                  {docInfo.about}
                </p>
              </div>

              {/* Appointment Fee */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <p className="text-gray-700 font-medium text-lg">
                  Appointment fee:{" "}
                  <span className="text-2xl font-bold text-green-600">
                    {currencySymbol}
                    {docInfo.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12 border border-gray-100">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Available Slots
            </h3>
            <p className="text-gray-600">Select your preferred date and time</p>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Choose Date
            </h4>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`flex-shrink-0 text-center py-6 px-4 min-w-20 rounded-2xl cursor-pointer transition-all duration-300 ${
                      slotIndex === index
                        ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-md"
                    }`}
                    key={index}
                  >
                    {item.length > 0 && item[0]?.dateTime && (
                      <>
                        <p className="text-sm font-medium opacity-80">
                          {daysOfWeek[item[0].dateTime.getDay()]}
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          {item[0].dateTime.getDate()}
                        </p>
                        <p className="text-xs opacity-70 mt-1">
                          {item[0].dateTime.toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </p>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Available Times
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {docSlots.length > 0 &&
                docSlots[slotIndex]?.map((item, index) => (
                  <button
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      item.time === slotTime
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="text-center">
            <button
              onClick={bookAppointment}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Book an appointment
            </button>
            {slotTime && docSlots[slotIndex]?.[0]?.dateTime && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-800 font-medium">
                  Selected: {docSlots[slotIndex][0].dateTime.toDateString()} at{" "}
                  {slotTime}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Doctors */}
        <div className="mb-12">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
