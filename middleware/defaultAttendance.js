import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const employees = await Employee.find({});

    for (const employee of employees) {
      const exists = await Attendance.findOne({ date, employeeId: employee._id });

      if (!exists) {
        await Attendance.create({ date, employeeId: employee._id, status: null });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;