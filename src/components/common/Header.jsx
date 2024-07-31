import React from 'react'
import logo from "../../assets/warehouse.png"
import "../../styles/Header.css"

const Header = (props) => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="welcome-message">
        Welcome to <b>{props.warehouseName}</b> warehouse
      </div>
    </div>
  )
}

export default Header