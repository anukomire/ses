require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = 7501;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
}));

// Rate limiting for contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many contact requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});


export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'softelectronicsolutions.com',
        pass: 'esud nqnh zqau xqvg'
      }
    });

    // Email to yourself (your inbox)
    const mailOptionsToYou = {
      from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333;">Contact Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submissions
Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

Message:
${message}
      `
    };

    // Optional: Confirmation email to the user
    const mailOptionsToUser = {
      from: `"Your Company Name" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Thank You!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out. We have received your message and will get back to you within 24-48 hours.</p>
          <p>Best regards,<br>Your Company Team</p>
        </div>
      `,
      text: `Thank you for contacting us! We have received your message and will get back to you soon.`
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToUser);

    console.log('Email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);

    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check email configuration.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection error. Please check your internet connection.';
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure nodemailer with Gmail SMTP
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'softelectronicsolutions.com',
            pass: 'esud nqnh zqau xqvg',
        },
        tls: {
            rejectUnauthorized: false // For development
        }
    });
};

// Validate email function
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate form data
// const validateFormData = (data) => {
//     const errors = [];
    
//     if (!data.name || data.name.trim().length < 2) {
//         errors.push('Name must be at least 2 characters long');
//     }
    
//     if (!data.email || !validateEmail(data.email)) {
//         errors.push('Please provide a valid email address');
//     }
    
//     if (!data.message || data.message.trim().length < 10) {
//         errors.push('Message must be at least 10 characters long');
//     }
    
//     return errors;
// };
// Test email connection endpoint
app.get('/api/test-email', async (req, res) => {
    try {
        const transporter = createTransporter();
        
        // Verify connection configuration
        await transporter.verify();
        
        res.status(200).json({
            success: true,
            message: 'Email server is ready to send messages',
            email: process.env.GMAIL_USER ? 'Configured' : 'Not configured'
        });
    } catch (error) {
        console.error('Email test failed:', error);
        res.status(500).json({
            success: false,
            message: 'Email configuration error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Check server configuration'
        });
    }
});

// Contact form endpoint with rate limiting
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        console.log('Contact form submission received:', req.body);
        
        const { name, email, company, phone, message } = req.body;
        
        // Validate required fields
        const validationErrors = validateFormData({ name, email, message });
        if (validationErrors.length > 0) {
            console.log('Validation errors:', validationErrors);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        // Create email transporter
        const transporter = createTransporter();
        
        // Test connection
        await transporter.verify();
        console.log('Email server connection verified');
        
        // Email options for company
        const mailOptionsToCompany = {
            from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `New Contact Form Submission: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2C3E50;">New Contact Form Submission</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #FF6B35;">
                        <h3 style="color: #2C3E50;">Contact Information:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #3498DB;">
                        <h3 style="color: #2C3E50;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: #e8f4fc; border-radius: 5px;">
                        <p style="margin: 0; color: #2C3E50;">
                            <strong>Submitted:</strong> ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ''}${phone ? `Phone: ${phone}\n` : ''}\nMessage:\n${message}\n\nSubmitted: ${new Date().toLocaleString()}`
        };
        
        // Email options for user (confirmation)
        const mailOptionsToUser = {
            from: `"Soft Electronic Solutions" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Thank you for contacting Soft Electronic Solutions',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; padding: 20px 0;">
                        <h1 style="color: #2C3E50;">Thank You!</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #2C3E50;">Dear ${name},</h2>
                        
                        <p>Thank you for reaching out to Soft Electronic Solutions. We have received your message and one of our representatives will get back to you within 24-48 hours.</p>
                        
                        <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 5px; border: 1px solid #ddd;">
                            <p><strong>Your Message:</strong></p>
                            <p style="color: #555; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
                        </div>
                        
                        <p><strong>Our Contact Information:</strong></p>
                        <ul style="color: #555;">
                            <li>Email: softelectronicsolutions@gmail.com</li>
                            <li>Phone: +91 8415796558</li>
                            <li>Business Hours: Monday - Saturday, 10:00 AM - 7:00 PM</li>
                        </ul>
                        
                        <p>Best regards,<br>
                        <strong>Soft Electronic Solutions Team</strong></p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; text-align: center; background: #2C3E50; color: white; border-radius: 5px;">
                        <p style="margin: 0;">© ${new Date().getFullYear()} Soft Electronic Solutions. All rights reserved.</p>
                    </div>
                </div>
            `,
            text: `Thank you for contacting Soft Electronic Solutions!\n\nDear ${name},\n\nThank you for reaching out to Soft Electronic Solutions. We have received your message and one of our representatives will get back to you within 24-48 hours.\n\nYour Message:\n"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"\n\nOur Contact Information:\n- Email: softelectronicsolutions@gmail.com\n- Phone: +91 8415796558\n- Business Hours: Monday - Saturday, 10:00 AM - 7:00 PM\n\nBest regards,\nSoft Electronic Solutions Team\n\n© ${new Date().getFullYear()} Soft Electronic Solutions. All rights reserved.`
        };
        
        console.log('Sending emails...');
        
        // Send email to company
        const companyResult = await transporter.sendMail(mailOptionsToCompany);
        console.log('Email sent to company:', companyResult.messageId);
        
        // Send confirmation email to user
        const userResult = await transporter.sendMail(mailOptionsToUser);
        console.log('Confirmation email sent to user:', userResult.messageId);
        
        res.status(200).json({
            success: true,
            message: 'Thank you for your message! We have sent you a confirmation email and will get back to you soon.'
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        let errorMessage = 'Failed to send message. Please try again later.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please check your Gmail App Password in the .env file.';
        } else if (error.code === 'ESOCKET') {
            errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.message.includes('Invalid login')) {
            errorMessage = 'Invalid email credentials. Please check GMAIL_USER and GMAIL_APP_PASSWORD in .env file.';
        }
        
        res.status(500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        service: 'Soft Electronic Solutions API',
        version: '1.0.0',
        emailConfigured: !!process.env.GMAIL_USER
    });
});

// Serve static files from React build directory if it exists
app.use(express.static(path.join(__dirname, 'public')));

// For any other route, serve the main HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    
    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy: Request not allowed from this origin'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    🚀 Soft Electronic Solutions Server
    📍 Port: ${PORT}
    🌐 Environment: ${process.env.NODE_ENV || 'development'}
    📅 Started: ${new Date().toLocaleString()}
    
    📧 Email Configuration:
    - Gmail User: ${process.env.GMAIL_USER || '✗ Not configured'}
    ${process.env.GMAIL_USER ? '- Status: ✓ Ready' : '- ⚠️  Please set GMAIL_USER in .env file'}
    
    🔗 API Endpoints:
    GET  /api/health         - Health check
    GET  /api/test-email     - Test email configuration
    POST /api/contact        - Contact form submission
    
    📞 Test endpoints:
    curl http://localhost:${PORT}/api/health
    curl http://localhost:${PORT}/api/test-email
    
    ⚠️  Important:
    1. Make sure .env file has GMAIL_USER and GMAIL_APP_PASSWORD
    2. Enable 2FA in Google Account and generate App Password
    3. Test with: http://localhost:${PORT}/api/test-email
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});