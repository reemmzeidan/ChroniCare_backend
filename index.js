const express = require('express');
const app = express();
const DB = require("./database").connectDB;
const authRoutes = require("./routers/authRoutes");
const trackingRoutes = require("./routers/trackingRoutes");
const resourceRoutes = require("./routers/resourceRoutes");
const reportRoutes = require("./routers/reportRoutes");
const pointsRoutes = require("./routers/pointsRoutes");
const planRoutes = require("./routers/planRoutes");
const patientRoutes = require("./routers/patientRoutes");
const doctorRoutes = require("./routers/doctorRoutes");
const caregiverRoutes = require("./routers/caregiverRoutes");
const medicationRoutes = require("./routers/medicationRoutes");
const goalRoutes = require("./routers/goalRoutes");
const notificationRoutes = require("./routers/notificationRoutes");
const messageRoutes = require("./routers/messageRoutes");
const chatRoomRoutes = require("./routers/chatRoomRoutes");
const emergencyAlertRoutes = require("./routers/emergencyAlertRoutes");
const appointmentRoutes = require("./routers/appointmentRoutes");


DB();   

app.use(express.json())

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));

app.use("/api/tracking", trackingRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chatrooms", chatRoomRoutes);
app.use("/api/alerts", emergencyAlertRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
});
