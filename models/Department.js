import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";


const DepartmentSchema = new mongoose.Schema({
    dep_name : {type:String , required:true},
    description:{type:String},
    createdAt:{type:Date , default: Date.now},
    updatedAt:{type:Date , default: Date.now}

})
DepartmentSchema.pre("deleteOne" , {document : "true" , query : false } , async function(){
    try{
             const employee = await Employee.find({department : this._id})
             const empIds = employee.map(emp => emp._id)

            await Employee.deleteMany({department : this._id})
            await Leave.deleteMany({employeeId :{$in :empIds}})
            await Salary.deleteMany({employeeId :{$in :empIds}})
        
    }catch(error){
        console.log(error)
    }
})

const Department = mongoose.model("Department" , DepartmentSchema)
export default Department;