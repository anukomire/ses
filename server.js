const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'softelectronicsolutions@gmail.com',
     pass: 'esud nqnh zqnh zqau xqvg' 
  }
});
// In-memory storage for contact form submissions
let contacts = [];
let projects = [
  {
    id: 1,
    title: "Enterprise CRM System",
    description: "A comprehensive customer relationship management system with AI-powered analytics and real-time reporting capabilities.",
    category: "Software",
    status: "completed",
    technologies: "React, Node.js, MongoDB, AWS, Socket.io",
    created_at: "2024-01-15T00:00:00.000Z"
  },
  {
    id: 2,
    title: "IoT Smart Home Solution",
    description: "Advanced Internet of Things platform for smart home automation, energy management, and security monitoring.",
    category: "Hardware",
    status: "ongoing",
    technologies: "Python, Raspberry Pi, MQTT, React Native, TensorFlow Lite",
    created_at: "2024-02-20T00:00:00.000Z"
  },
  {
    id: 3,
    title: "AI Research Platform",
    description: "Machine learning platform for predictive analytics, natural language processing, and advanced data visualization.",
    category: "Research",
    status: "completed",
    technologies: "Python, TensorFlow, React, D3.js, FastAPI",
    created_at: "2024-01-10T00:00:00.000Z"
  }
];

// HTML template for the SPA
const getHTMLTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soft Electronic Solutions - Innovative Software Development</title>
    <meta name="description" content="Soft Electronic Solutions - Leading software development company specializing in web applications, mobile apps, cloud solutions, and AI technology.">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
            overflow: hidden;
        }
        
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #FF6B35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-text {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #FF6B35 0%, #3498DB 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading-screen">
            <div class="logo">
                <div class="logo-icon">SES</div>
                <h1>Soft Electronic Solutions</h1>
            </div>
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading Professional Solutions...</div>
        </div>
    </div>
    <script src="/app.js"></script>
</body>
</html>
`;

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API Routes
    if (pathname === '/api/projects' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: projects,
            count: projects.length
        }));
        return;
    }

    if (pathname === '/api/contact' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const formData = JSON.parse(body);
                const { name, email, company, phone, message } = formData;
                
                // Validation
                if (!name || !email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Name, email, and message are required fields'
                    }));
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Please provide a valid email address'
                    }));
                    return;
                }
                
                // Save contact
                const newContact = {
                    id: contacts.length + 1,
                    name,
                    email,
                    company: company || '',
                    phone: phone || '',
                    message,
                    submitted_at: new Date().toISOString(),
                    status: 'new'
                };
                
                contacts.push(newContact);
                console.log('New contact submission:', newContact);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Thank you for your message! We will get back to you soon.',
                    data: {
                        id: newContact.id,
                        submitted_at: newContact.submitted_at
                    }
                }));
                
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Error processing your request',
                    error: error.message
                }));
            }
        });
        return;
    }

    if (pathname === '/api/health' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            message: 'Server is running',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }));
        return;
    }

    // Serve app.js
    if (pathname === '/app.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(`
            // React app will be loaded here
            console.log('Soft Electronic Solutions - Professional Software Development');
            
            // Remove loading screen
            setTimeout(function() {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        // Load the main app
                        loadMainApp();
                    }, 500);
                }
            }, 1000);
            
            function loadMainApp() {
                // This is where the React app would be loaded
                document.getElementById('root').innerHTML = \`
                    <div style="text-align: center; padding: 50px; color: #2C3E50;">
                        <h1>🚀 Soft Electronic Solutions</h1>
                        <p>Professional Software Development Services</p>
                        <div style="margin-top: 30px;">
                            <a href="#home" style="margin: 10px; padding: 10px 20px; background: #FF6B35; color: white; text-decoration: none; border-radius: 5px;">Home</a>
                            <a href="#services" style="margin: 10px; padding: 10px 20px; background: #3498DB; color: white; text-decoration: none; border-radius: 5px;">Services</a>
                            <a href="#contact" style="margin: 10px; padding: 10px 20px; background: #2C3E50; color: white; text-decoration: none; border-radius: 5px;">Contact</a>
                        </div>
                    </div>
                \`;
            }
        `);
        return;
    }

    // Serve the main HTML for all other routes (SPA)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getHTMLTemplate());
});

// Start server
server.listen(PORT, () => {
    console.log(`
    🚀 Soft Electronic Solutions Server is running!
    📍 Port: ${PORT}
    🌐 Environment: ${process.env.NODE_ENV || 'development'}
    📅 Started: ${new Date().toLocaleString()}
    
    📊 Available Endpoints:
    GET  /api/projects          - Get all projects
    POST /api/contact           - Submit contact form
    GET  /api/health           - Health check
    
    🔗 Frontend: http://localhost:${PORT}
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        process.exit(0);
    });
});