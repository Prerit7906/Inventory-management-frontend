import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
  const Products = () =>  {
	return (
	  <div className='productsMain'>
        <Link to={'/viewProducts'}>View Products</Link>
        {/* <Link to={'/addAProduct'}>View Products</Link> */}
	  </div>
	);
  }
  
  export default Products;
  