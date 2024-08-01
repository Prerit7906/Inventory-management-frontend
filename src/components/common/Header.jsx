import React from 'react'
import logo from "../../assets/warehouse.png"
import "../../styles/Header.css"
// prerit here 
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  {/* prerit here  */}
  const navigate=useNavigate();
  return (
    <div className="header">
      <img onClick={()=>{
        navigate('/home');
      }} src={logo} alt="Logo" className="logo" />
      <div className="welcome-message">
        Welcome to <b>{props.warehouseName}</b> warehouse
      </div>
      {/* prerit here  */}
      <button onClick={()=>{
        props.setIsLoggedIn(false);
        navigate('/')
      }} id='logoutBtn'>Logout</button>
    </div>
  )
}

export default Header