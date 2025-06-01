// import React, { useContext, useState } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { data } from "react-router";
// import { DoctorContext } from "../context/DoctorContext";

// const Login = () => {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken } = useContext(DoctorContext);

//   const onSubminHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });
//         // console.log(data);
//         if (data.success) {
//           // console.log(data.token);
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);
//         } else {
//           //Show error message as toast
//           // console.log(data.message);
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/doctor/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           // console.log(data.token);
//           localStorage.setItem("dToken", data.token);
//           setDToken(data.token);
//           console.log(data.token);
//         } else {
//           //Show error message as toast
//           // console.log(data.message);
//           toast.error(data.message);
//         }
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <form onSubmit={onSubminHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold m-auto">
//           <span className="text-primary">{state}</span> Login
//         </p>
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>
//         <button className="bg-primary text-white w-full py-2 rounded-md text-base">
//           Login
//         </button>
//         {state === "Admin" ? (
//           <p>
//             Doctor Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Doctor")}
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Admin")}
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { Eye, EyeOff, User, UserCheck, Mail, Lock } from "lucide-react";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubminHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-6">Please sign in to your account</p>

          <div className="relative inline-flex bg-gray-200 rounded-full p-1 mb-6">
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                state === "Doctor" ? "transform translate-x-full" : ""
              }`}
            />
            <button
              type="button"
              className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                state === "Admin" ? "text-primary" : "text-gray-600"
              }`}
              onClick={() => setState("Admin")}
            >
              <User size={16} />
              Admin
            </button>
            <button
              type="button"
              className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                state === "Doctor" ? "text-primary" : "text-gray-600"
              }`}
              onClick={() => setState("Doctor")}
            >
              <UserCheck size={16} />
              Doctor
            </button>
          </div>
        </div>

        <form
          onSubmit={onSubminHandler}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 ${
                state === "Admin"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {state === "Admin" ? <User size={24} /> : <UserCheck size={24} />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-primary">{state}</span> Login
            </h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium text-base hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-primary/20 outline-none">
              Sign in as {state}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need to switch roles?{" "}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium underline transition-colors"
                onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
              >
                Login as {state === "Admin" ? "Doctor" : "Admin"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
