import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { getSummary } from "../controllers/dashboardController.js"

const Router = express.Router()

Router.get("/summary" , authMiddleware , getSummary)

export default Router;