import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css"
  
  const Navbar = () =>  {
	return (
	  <div className='navbarMain'>
        <Link to={'/categories'}>Categories</Link>
        <Link to={'/viewproducts'}>Products</Link>
        <Link to={'/salesOrders'}>Sales orders</Link>
        <Link to={'/suppliers'}>Suppliers</Link>
	  </div>
	);
  }
  
  export default Navbar;
  