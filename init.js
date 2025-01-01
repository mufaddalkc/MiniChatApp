const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

const chats = [
  {
    from: "Alice",
    to: "Bob",
    message: "Hey Bob, how's everything going with the new project?",
    created_at: new Date("2024-12-31T09:00:00Z"),
  },
  {
    from: "Bob",
    to: "Alice",
    message:
      "Hi Alice! It's going well, but there's a lot to do. How about you?",
    created_at: new Date("2024-12-31T09:05:00Z"),
  },
  {
    from: "Charlie",
    to: "Dana",
    message:
      "Dana, I finished reviewing the report. I'll send you the feedback soon.",
    created_at: new Date("2024-12-31T09:10:00Z"),
  },
  {
    from: "Dana",
    to: "Charlie",
    message: "Thanks Charlie! Looking forward to your feedback. Speak soon!",
    created_at: new Date("2024-12-31T09:15:00Z"),
  },
];

Chat.insertMany(chats);
