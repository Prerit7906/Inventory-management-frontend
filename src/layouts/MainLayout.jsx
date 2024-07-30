import React from 'react';
import Navbar from '../components/common/Navbar';
import Header from '../components/common/Header';
import "../styles/MainLayout.css"
  
  const MainLayout = (props) =>  {
	return (
    <>
    <Header warehouseName={props.warehouseName}/>
    <div className='mainLayoutMainContent'>
      <div className='mainLeft'>
    <Navbar />
    </div>
    <div className='mainRight'>
      {props.children}
    </div>
    </div>
    </>
	);
  }
  
  export default MainLayout;
  