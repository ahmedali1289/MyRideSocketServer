const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");

const io = socketio(server);
app.get("/*", function (req, res) {
  res.write(`<h1>Hello socket</h1> ${PORT}`);
  res.end;
});
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", ({ from, to,  message, time }) => {
    io.emit("message", {
      from: from,
      to: to,
      message: message,
      time:time
    });
    console.log("sent,recieve", from, to,  message,time);
  });
  socket.on("rideRequest", ({ data }) => {
    io.emit("rideRequest", {data});
    console.log("Ride Request data", data);
  });
  socket.on("rideAccept", ({ data }) => {
    io.emit("rideAccept", {data});
    console.log("accept data", data);
  });
  socket.on("rideArrived", ({ from, to }) => {
    io.emit("rideArrived", {
      from: from,
      to: to
    });
    console.log("sent,recieve", from, to);
  });
  socket.on("rideStarted", ({ from, to }) => {
    io.emit("rideStarted", {
      from: from,
      to: to
    });
    console.log("sent,recieve", from, to);
  });
  socket.on("rideEnd", ({ from, to }) => {
    io.emit("rideEnd", {
      from: from,
      to: to
    });
    console.log("sent,recieve", from, to);
  });
  socket.on("rideRated", ({ from, to }) => {
    io.emit("rideRated", {
      from: from,
      to: to
    });
    console.log("sent,recieve", from, to);
  });
  socket.on("rideDecline", ({ from, to }) => {
    io.emit("rideDecline", {
      from: from,
      to: to
    });
    console.log("sent,recieve", from, to);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
