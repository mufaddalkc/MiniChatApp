const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connected to MongoDB yes");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://chharchhodawalam:x4HoofC4jmKSTDr4@cluster0.t14as.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0"
  );
}
// Root directory
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New chat directory
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create new chat directory
app.post("/chats", (req, res) => {
  const { from, message, to } = req.body;
  const newChat = new Chat({
    from,
    to,
    message,
    created_at: new Date(),
  });
  newChat.save().then(() => res.redirect("/chats"));
});

// Edit directory
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update directory
app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { message: newChat } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newChat },
    { runvalidters: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Delete directory
app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

// Home directory
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
