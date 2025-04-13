// serveurclient.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse JSON bodies

// Fake orders data
const clients = [
  {
    id: "10",
    first: "Asma",
    last: "kjhkjh",
    mail: "Asma@gmail.com",
    phone: "0767123433",
    approved: "true",
  },
  {
    id: "11",
    first: "Khadija",
    last: "kjhkjh",
    mail: "Khadija@gmail.com",
    phone: "0760023433", 
    approved: "null",
 },
 {
    id: "12",
    first: "Ahmed",
    last: "kjhkjh",
    mail: "Ahmed@gmail.com",
    phone: "0760023433", 
    approved: "false",
 },
];

// GET all clients
app.get("/clients", (req, res) => {
    console.log(clients);
  res.json(clients);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
