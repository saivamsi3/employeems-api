import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";


const getAttendance  = async(req , res)=>{
   
 try{
        const date = new Date().toISOString().split("T")[0];    // yyyy-mm-dd
        const attendance = await Attendance.find({date}).populate({
            path:"employeeId",
            populate:[
               { path: "userId", select: "name" },     
               { path: "department", select: "dep_name" }
            ]
        });

   res.status(200).json({success:true , attendance})


 }catch(error){
     console.log("ATTENDANCE ERROR:", error);
   res.status(500).json({success:false , error:error.message})
    }
}

const updateAttendance = async(req , res)=>{
   try{
          const {employeeId} = req.params;
          const {status} = req.body;
          const date = new Date().toISOString().split("T")[0]
          const employee = await Employee.findOne({employeeId})      
          const attendance = await Attendance.findOneAndUpdate({employeeId : employee._id , date} , {status} , {returnDocument: 'after'})
          res.status(200).json({success:true , attendance})
   }catch(error){
                  res.status(500).json({success:false , message : error.message})

   }
}

export {getAttendance , updateAttendance} 