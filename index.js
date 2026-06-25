import "./config/env.js"
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from "./routes/salary.js"
import dashboardRouter from "./routes/dashboard.js"
import leaveRouter from "./routes/leave.js"
import attendanceRouter from "./routes/attendance.js"
import settingRouter from "./routes/setting.js"
import { connectDB } from "./config/db.js"
// import  {userRegister} from "./userSeed.js"


const app = express()
app.use(cors({
  origin: [
    'https://employeems-frontend-1.onrender.com',
    "http://localhost:5173"
  ],
  credentials:true
}))
app.use(cors());
app.use(express.json())
connectDB();
app.use(express.static("public/uploads"))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});
// export default app;

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})



