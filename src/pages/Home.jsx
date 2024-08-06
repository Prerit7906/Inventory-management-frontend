import React from 'react';
import ViewProducts from './ViewProducts';
import { Link } from 'react-router-dom';
import CategoryCharts from '../components/charts/CategoryCharts';
  
  const Home = ({warehouseId}) =>  {
	return (
	  <div>
        <CategoryCharts warehouseId={warehouseId}/>
	  </div>
	);
  }
  
  export default Home;
  
