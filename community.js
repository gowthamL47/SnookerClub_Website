// Install required packages using: npm install express mysql2 nodemailer dotenv
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
  
      const name = form.querySelector('input[name="name"]').value;
      const question = form.querySelector('textarea[name="question"]').value;
  
      try {
        const response = await fetch("http://localhost:3000/post-question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, question }),
          });
          
  
        const result = await response.json();
        if (response.ok) {
          alert(result.success);
          form.reset();
        } else {
          alert(result.error || "An error occurred.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to submit the question. Please try again.");
      }
    });
  });


