import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../styles/Navbar.css"

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='navbarMain'>
      <Link 
        to={'/home'} 
        className={location.pathname === '/home' ? 'active' : ''}
      >
        Home
      </Link>
      <Link 
        to={'/categories'} 
        className={location.pathname === '/categories' ? 'active' : ''}
      >
        Categories
      </Link>
      <Link 
        to={'/viewproducts'} 
        className={location.pathname === '/viewproducts' ? 'active' : ''}
      >
        Products
      </Link>
      <Link 
        to={'/lowproducts'} 
        className={location.pathname === '/lowproducts' ? 'active' : ''}
      >
        Inventory Levels
      </Link>
      <Link 
        to={'/salesOrders'} 
        className={location.pathname === '/salesOrders' ? 'active' : ''}
      >
        Sales Orders
      </Link>
      <Link 
        to={'/suppliers'} 
        className={location.pathname === '/suppliers' ? 'active' : ''}
      >
        Suppliers
      </Link>
      <Link 
        to={'/purchaseOrders'} 
        className={location.pathname === '/purchaseOrders' ? 'active' : ''}
      >
        Purchase orders
      </Link>
    </div>
  );
}

export default Navbar;
