import React from 'react';
 import "../../styles/Navbar.css"
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css"
  
  const Navbar = () =>  {
	return (
	  <div className='navbarMain'>
        <Link to={'/viewproducts'}>Products</Link>
        <Link to={'/about'}>Sales orders</Link>
	  </div>
	);
  }
  
  export default Navbar;
  