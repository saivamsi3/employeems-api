import express from "express";
import { getAttendance , updateAttendance } from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import defaultAttendance from "../middleware/defaultAttendance.js"
const router = express.Router();


router.get("/" , authMiddleware, defaultAttendance , getAttendance );
router.put("/update/:employeeId", authMiddleware ,  updateAttendance )


export default router;