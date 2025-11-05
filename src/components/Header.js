import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
return (
<header className="header">
<div className="container">
<nav className="navbar">
<div className="logo">
<span>SOFT</span> <span2>ELECTRONIC</span2><span>SOLUTIONS</span>
</div>
<ul className="nav-links">
<li><Link to="/">Home</Link></li>
<li><Link to="/services">Services</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
</ul>
<Link to="/contact" className="cta-button">
Get Started
</Link>
</nav>
</div>
</header>
);
};

export default Header;