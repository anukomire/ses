const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const helmet = require('helmet');
const mysql = require('mysql2/promise');
const WebSocket = require('ws');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
// app.use(cors());
// Replace the current CORS setup with:
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression()); // Enable gzip compression
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Enhanced CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'ses-website',
  waitForConnections: true,
  connectionLimit: 50, // Increased connection limit
  // acquireTimeout: 60000,
  // timeout: 60000,
  // queueLimit: 1000, // Increased queue limit
  // enableKeepAlive: true,
  // keepAliveInitialDelay: 0,
  // charset: 'utf8mb4'
};

const pool = mysql.createPool(dbConfig);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: 'anukomire81@gmail.com',
    user: 'anukomire81@gmail.com',
     pass: 'ojkq lbco julv uvcz' 
    // pass: 'wxzz rqlc rqjm dtmh' ses-books
    // pass: 'mbho qhkx umvi txkr' anukomire
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${duration}ms`);
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(`🚨 SLOW REQUEST: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  next();
});


// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company, phone } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});