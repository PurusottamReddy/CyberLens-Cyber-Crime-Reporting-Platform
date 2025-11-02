import express from "express";
import {createCrimeReport,getAllCrimeReports,getUserCrimeReports,getCrimeReport,fraudLookup,deleteCrimeReport,updateStatus} from "../controllers/crimeController.js"
import {isAuth} from "../middlewares/authMiddleware.js"
import {checkRole} from "../middlewares/roleMiddleware.js"
import {upload} from "../configs/multer.js"

const crimeRouter= express.Router();

crimeRouter.post("/create-crime-report",isAuth,checkRole("user","authority","admin"),upload.array("evidence"),createCrimeReport);
crimeRouter.get("/get-all-crime-reports",isAuth,checkRole("authority","admin"),getAllCrimeReports);
crimeRouter.get("/get-user-crime-reports/:userId",isAuth,checkRole("user","authority","admin"),getUserCrimeReports);
crimeRouter.get("/get-crime-report/:crimeId",isAuth,checkRole("user","authority","admin"),getCrimeReport)
crimeRouter.put("/update-status/:crimeId",isAuth,checkRole("authority","admin"),updateStatus)
crimeRouter.post("/fraud-lookup",fraudLookup)
crimeRouter.delete("/delete-crime-report/:crimeId",isAuth,checkRole("user","admin","authority"),deleteCrimeReport)

export default crimeRouter;
