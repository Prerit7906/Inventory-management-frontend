import React from 'react';
import CategoryCharts from '../components/charts/CategoryCharts';
  
  const Home = ({warehouseId}) =>  {
	return (
	  <div>
        <CategoryCharts warehouseId={warehouseId}/>
	  </div>
	);
  }
  
  export default Home;
  
