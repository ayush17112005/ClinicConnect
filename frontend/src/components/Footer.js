import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  const d = new Date();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">Get In TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>8273552423</li>
            <li>saxenayushman99@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*CopyRight text */}
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © {d.getFullYear()} Ayushman Saxena - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
