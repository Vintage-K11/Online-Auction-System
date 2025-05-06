import express from "express";
const router = express.Router();
import app from './app.js';
import  cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary Config:", cloudinary.config());

// Simulating server connection status
let isServerConnected = false;

// Function to simulate server connection (toggle after a delay)
setTimeout(() => {
    isServerConnected = true;
    console.log("Server is now connected.");
}, Math.random() * (120000 - 50000) + 50000); // Random delay between 50 sec to 2 min

// Controller to check server connection
router.get('/status', (req, res) => {
    if (!isServerConnected) {
        return res.status(503).json({ message: "Please wait while connecting to the server..." });
    }
    res.status(200).json({ message: "Server is connected." });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});


