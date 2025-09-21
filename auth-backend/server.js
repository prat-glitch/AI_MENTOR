const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "mysecretkey";
let users = [];

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    // res.json({ message: "User created", token });
    return res.status(200).json({ message: "User created", token });
  });;

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("current users:", users);
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: "User not found" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Wrong password" });
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  });

// Protected route
app.get("/me", (req, res) => {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "No token" });
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      res.json({ user: decoded.email });
    } catch (err) {
      res.status(403).json({ error: "Invalid token" });
    }
  });

app.listen(5000, () => console.log("Auth server running at http://localhost:5000"));