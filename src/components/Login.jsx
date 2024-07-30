import React from 'react';
import '../styles/Login.css'


const Login = (props) => {
  const wareHouses=[{
    warehouseId:1,
    warehouseName:"Bengaluru"
  },{
    warehouseId:2,
    warehouseName:"Agra"
  },{
    warehouseId:3,
    warehouseName:"Delhi"
  },{
    warehouseId:4,
    warehouseName:"Mumbai"
  }];
  
  const submitHandler=(e)=>{
    e.preventDefault();
    props.setIsLoggedIn(true);
    // alert("hgjhb");

  }
  const warehouseChangeHandler=(event)=>{
    props.setWarehouseName(event.target.value);
  }
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="warehouse">Warehouse</label>
          <select onChange={warehouseChangeHandler}  id="warehouse" name="warehouse">
          <option value="wareHouse" selected >Select warehouse</option>
            {wareHouses.map(wareHouse => 
              <option value={wareHouse.warehouseName}>{wareHouse.warehouseName}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username"  />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
