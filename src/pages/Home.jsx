import React from 'react';
import ViewProducts from './ViewProducts';
import { Link } from 'react-router-dom';
  
  const Home = () =>  {
	return (
	  <div>
        
        <Link to={'/viewProducts'}><ViewProducts/></Link>
	  </div>
	);
  }
  
  export default Home;
  