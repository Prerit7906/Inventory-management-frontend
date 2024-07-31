import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css"
  
  const Navbar = () =>  {
	return (
	  <div className='navbarMain'>
        <Link to={'/'}>Products</Link>
        <Link to={'/salesOrders'}>Sales orders</Link>
	  </div>
	);
  }
  
  export default Navbar;
  