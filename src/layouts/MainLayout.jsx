import React from 'react';
import Navbar from '../components/common/Navbar';
import Header from '../components/common/Header';
  
  const MainLayout = ({children}) =>  {
	return (
        <>
        <Header/>
      <Navbar/>

      <div className='mainLayoutContent'>
        {children}
      </div>
      </>
	);
  }
  
  export default MainLayout;
  