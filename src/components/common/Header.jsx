import React from 'react'
import logo from "../../assets/warehouse.png"
import "../../styles/Header.css"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
const Header = (props) => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/notifications');
  };
  return (
    <div className='headerMain'>
      <div className="header">
        <img onClick={() => {
          navigate('/home');
        }} src={logo} alt="Logo" className="logo" />
        <div className="welcome-message">
          Welcome to <b>{props.warehouseName}</b> warehouse
        </div>
        <FontAwesomeIcon onClick={handleClick} icon={faBell} className="notification-icon" />
        <button onClick={() => {
          props.setIsLoggedIn(false);
          navigate('/')
        }} id='logoutBtn'>Logout</button>
      </div>
    </div>
  )
}

export default Header;
