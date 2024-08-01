import React, { useEffect, useState } from 'react';
import '../styles/Login.css'
import FetchData from '../api/FetchData';
import { Link, useNavigate } from 'react-router-dom';


const Login = (props) => {
  const navigate=useNavigate();
  const [warehouses,setwareHouses]=useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isUservalid,setIsUserValid]=useState(false);

  useEffect(()=>{
    FetchData("http://localhost:9090/api/v1.0/warehouses/all",setwareHouses);
  },[])

  const submitHandler=async (e)=>{
    var responseData=null;
    e.preventDefault();
    const url=`http://localhost:9090/api/v1.0/warehouses/check-credentials/${selectedWarehouseId}/${userId}/${password}`;
    console.log(url);
    const response= await fetch(url);
    responseData=await response.json();
    if(responseData){
      props.setIsLoggedIn(true);
      setIsUserValid(true);
    props.setWarehouseName(selectedWarehouse);
  props.setWarehouseId(selectedWarehouseId);
  navigate('/home');
    }
    else{
      // props.setIsLoggedIn(false);
      alert("user is not valid");
    }    
  }
  const handleWarehouseChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const selected = selectedOption.value;
    const warehouseId = selectedOption.getAttribute('data-warehouse-id');
    setSelectedWarehouse(selected);
    setSelectedWarehouseId(warehouseId);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="warehouse">Warehouse</label>
          <select
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
            id="warehouse"
            name="warehouse"
            required
          >
            <option value="" disabled>Select warehouse</option>
            {warehouses.map(warehouse =>
              <option key={warehouse.warehouseId} value={warehouse.warehouseName} data-warehouse-id={warehouse.warehouseId}>
                {warehouse.warehouseName}
              </option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input required onChange={(e)=>{setUserId(e.target.value)}} type="text" id="username" name="username"  />
        </div>
        <div className="form-group">
          <label htmlFor="id">Password</label>
          <input required onChange={(e)=>{setPassword(e.target.value)}} type="password" id="id" name="id" />
        </div>
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to={'/signup'}>Register here</Link>
    </div>
  );
};

export default Login;
