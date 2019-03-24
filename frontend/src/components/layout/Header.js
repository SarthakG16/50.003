import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header style={headerStyle}>
			<h1>ACNAPI Services</h1>
			<Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/NewTicket">Contact Us</Link> |
			 <Link style={linkStyle} to="/Archive">Archive</Link>
		</header>
	)
}

const headerStyle = {
	backgroundColor: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '10px'
}

const linkStyle = {
	color: '#fff',
	textDecoration: 'none'
}


export default Header;