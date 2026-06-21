import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import path from "path";
import bcrypt from "bcrypt";
import Department from "../models/Department.js";

/* MULTER SETUP  */
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/uploads");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

export const uplode = multer({ storage });

/*  ADD EMPLOYEE */
  
const addEmployee = async (req, res) => {

  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        success: false,
        error: "User already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee created",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error in adding employee",
    });
  }
};




/* GET ALL EMPLOYEES */
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get employees server error",
    });
  }
};

/* GET SINGLE EMPLOYEE  */
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    let employee =
      (await Employee.findById(id)
        .populate("userId", { password: 0 })
        .populate("department")) ||

      (await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department"));

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get employee server error",
    });
  }
};

/* UPDATE EMPLOYEE  */
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    // Find employee
    let employee = await Employee.findById(id);

    if (!employee) {
      employee = await Employee.findOne({ userId: id });
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Find user
    const user = await User.findById(employee.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Update User (name)

    await User.findByIdAndUpdate(employee.userId, {
      name,
    });

    // Update Employee

    await Employee.findByIdAndUpdate(employee._id, {
      maritalStatus,
      designation,
      department,
      salary,
    });

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Update employee server error",
    });
  }
};

const fetchEmployeesByDepId = async(req , res)=>{
      try {
    const { id } = req.params;

    const employees = await Employee.find({department : id})

    return res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get employeesByDepId server error",
    });
  } 
}

export {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId
};
