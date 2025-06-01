import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 bg-opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 bg-opacity-25 rounded-full blur-3xl"></div>
        </div>

        {/* Main Container */}
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-36 relative">
              <div className="absolute inset-0 bg-white bg-opacity-10"></div>

              {/* Profile Picture */}
              <div className="absolute -bottom-16 left-8">
                {isEdit ? (
                  <label htmlFor="image" className="cursor-pointer group">
                    <div className="relative">
                      {/* Profile image  */}
                      <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl">
                        <img
                          className="w-full h-full rounded-full object-cover group-hover:brightness-90 transition-all duration-300"
                          src={
                            image ? URL.createObjectURL(image) : userData.image
                          }
                          alt="Profile"
                        />
                      </div>

                      <div className="absolute inset-0 w-32 h-32 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white">
                          <img
                            className="w-6 h-6 mx-auto mb-1"
                            src={assets.upload_icon}
                            alt="Upload"
                          />
                          <span className="text-xs">Change</span>
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                    />
                  </label>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={userData.image}
                      alt="Profile"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 pb-8 px-8">
              {/* Name Section */}
              <div className="mb-8">
                {isEdit ? (
                  <input
                    className="text-3xl font-bold text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 w-full focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {userData.name}
                  </h1>
                )}
              </div>

              {/* Information Cards */}
              <div className="space-y-6">
                {/* Contact Information Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-center mb-5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      Contact Information
                    </h2>
                    <div className="ml-auto w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📞</span>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="hover:translate-x-1 transition-transform duration-200">
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <span className="text-blue-600 font-medium">
                          {userData.email}
                        </span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="hover:translate-x-1 transition-transform duration-200">
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      {isEdit ? (
                        <input
                          className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                          type="text"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <span className="text-blue-600 font-medium">
                            {userData.phone}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="hover:translate-x-1 transition-transform duration-200">
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Address
                      </label>
                      {isEdit ? (
                        <div className="space-y-2">
                          <input
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  line1: e.target.value,
                                },
                              }))
                            }
                            value={userData.address.line1}
                            type="text"
                            placeholder="Address Line 1"
                          />
                          <input
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  line2: e.target.value,
                                },
                              }))
                            }
                            value={userData.address.line2}
                            type="text"
                            placeholder="Address Line 2"
                          />
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="text-gray-700">
                            <p>{userData.address.line1}</p>
                            <p>{userData.address.line2}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Basic Information Card */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-center mb-5">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      Basic Information
                    </h2>
                    <div className="ml-auto w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">👤</span>
                    </div>
                  </div>

                  {/* Basic Info Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Gender */}
                    <div className="hover:translate-x-1 transition-transform duration-200">
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Gender
                      </label>
                      {isEdit ? (
                        <select
                          className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                          value={userData.gender}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <span className="text-purple-600 font-medium">
                            {userData.gender}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Birthday */}
                    <div className="hover:translate-x-1 transition-transform duration-200">
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      {isEdit ? (
                        <input
                          className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                          type="date"
                          value={userData.dob}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              dob: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <span className="text-purple-600 font-medium">
                            {userData.dob}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 text-center">
                {isEdit ? (
                  <div className="flex justify-center space-x-4">
                    {/* Save Button */}
                    <button
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={updateUserProfileData}
                    >
                      Save Changes
                    </button>

                    {/* Cancel Button */}
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  /* Edit Button */
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
