import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//API for the doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (err) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to complete the appointment
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// //API to cancel the appointment
// const appointmentCancel = async (req, res) => {
//   try {
//     const { docId, appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     if (appointmentData && appointmentData.docId === docId) {
//       await appointmentModel.findByIdAndUpdate(appointmentId, {
//         cancelled: true,
//       });
//       return res.json({ success: true, message: "Appointment Cancelled" });
//     } else {
//       return res.json({ success: false, message: "Cancellation Failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

//API to cancel the appointment and free the slot
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId !== docId) {
      return res.json({ success: false, message: "Invalid doctor ID" });
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Remove slot from doctor.slots_booked
    const slotDate = new Date(appointmentData.slotDate);
    const formattedDate = `${slotDate.getDate()}_${
      slotDate.getMonth() + 1
    }_${slotDate.getFullYear()}`;

    const formattedTime = slotDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (
      doctor.slots_booked[formattedDate] &&
      doctor.slots_booked[formattedDate].includes(formattedTime)
    ) {
      doctor.slots_booked[formattedDate] = doctor.slots_booked[
        formattedDate
      ].filter((time) => time !== formattedTime);

      // Optionally delete the date key if empty
      if (doctor.slots_booked[formattedDate].length === 0) {
        delete doctor.slots_booked[formattedDate];
      }

      await doctor.save();
    }

    return res.json({
      success: true,
      message: "Appointment Cancelled and slot freed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//API to get doctor profile for Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
