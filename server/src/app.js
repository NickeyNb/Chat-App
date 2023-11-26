import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

// socket are like phone number
io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    // receiving "send-message" event
    socket.on("send-message", (message) => {
        console.log(message); // {} messageData from fe
        // Broadcating the received data to all connected user
        io.emit("received-message", message);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});
