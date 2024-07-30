import React from 'react';
 import "../../styles/Navbar.css"
import { Link } from 'react-router-dom';
  
  const Navbar = () =>  {
	return (
	  <Navbar className="navbarMain">
        <Link to={'/'}>Products</Link>
        <Link to={'/about'}>Sales Orders</Link>
	  </Navbar>
	);
  }
  
  export default Navbar;
  