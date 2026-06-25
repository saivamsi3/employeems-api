import Attendance from "../models/Attendance.js";


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

export {getAttendance} 