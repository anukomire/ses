import React from 'react';

const Footer = () => {
return (
<footer className="footer">
<div className="container">
<div className="footer-content">
<div className="footer-section">
<h3>SOFT ELECTRONIC SOLUTIONS</h3>
<p>Building innovative software solutions that drive business growth and digital transformation.</p>
</div>
<div className="footer-section">
<h3>Quick Links</h3>
<ul>
<li><a href="/">Home</a></li>
<li><a href="/services">Services</a></li>
<li><a href="/about">About</a></li>
<li><a href="/contact">Contact</a></li>
</ul>
</div>
<div className="footer-section">
<h3>Contact Info</h3>
<p>Email: softelectronicsolutions@gmail.com</p>
<p>Phone: +1 (555) 123-4567</p>
<p>Address: Gayathri hills road number 2</p>
</div>
</div>
<div className="footer-bottom">
<p>© 2024 Soft Electronic Solutions. All rights reserved.</p>
</div>
</div>
</footer>
);
};

export default Footer;