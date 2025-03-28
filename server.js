require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: 'mypass',  
    database: 'snooker_club'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API Route to Save Contact Form Data
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Send Email Notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Contact Form Submission',
            text: `Thank you ${name}, we received your message: "${message}". We will get back to you soon.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ success: "Message sent successfully!" });
    });
});






// API Route to Save Reservation Data
// Import Nodemailer at the top

app.post('/reserve-table', (req, res) => {
    const { name, email, date, time } = req.body;
    if (!name || !email || !date || !time) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO reservations (name, email, date, time) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, date, time], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }

        // Send Email Notification (This must be in the backend)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,  // Use from .env file
                pass: process.env.EMAIL_PASS   // Use App Password from .env file
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Snooker Table Reservation Confirmation',
            text: `Dear ${name},\n\nYour table reservation is confirmed!\n\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you for choosing Snooker Club!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email Error:", error);
                return res.status(500).json({ error: "Reservation saved, but email failed to send." });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: "Table reserved successfully! Confirmation email sent." });
        });
    });
});


// API to handle form submission
app.post('/post-question', (req, res) => {
    const { name, question } = req.body;
  
    if (!name || !question) {
      return res.status(400).json({ error: 'Name and question are required' });
    }
  
    // Insert data into MySQL
    const sql = 'INSERT INTO questions (name, question) VALUES (?, ?)';
    db.query(sql, [name, question], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      // Send email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Question Submitted',
        text: `Name: ${name}\nQuestion: ${question}`,
      };
  
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Email notification failed' });
        }
        console.log('Email sent successfully');
        res.json({ success: 'Question submitted successfully!' });
      });
    });
  });

  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




