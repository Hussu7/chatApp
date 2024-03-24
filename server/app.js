const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const connectToDatabase = require("./database/database");
const User = require("./models/userModel");

const app = express();

const server = app.listen(4000, () => {
  console.log("server running at port :4000");
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
connectToDatabase();

//register user
app.post("/user", cors(), async (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  console.log(userName, password, confirmPassword);
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newUser = await User.create({
      userName,
      password,
    });
    console.log(newUser);
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    if (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});
// login user
app.get("/user", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const requestedUser = await User.findOne({ userName });

    if (!requestedUser || password !== requestedUser.password) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    return res.status(200).json({ message: "Login Successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);
  socket.on("newUser", (newUser)=>{
    console.log(newUser)
    socket.broadcast.emit("newUser", newUser)
  })
  socket.on("message", (data) => {
    const {message,id}=data
    io.emit("message", {message, id});
  });
  // socket.on("disconnect",()=>{
  //   console.log("user disconnected")
  // })
  
});
