import React, { useEffect, useState } from 'react';
import '../styles/Login.css'
import FetchData from '../api/FetchData';


const Login = (props) => {
  const [warehouses,setwareHouses]=useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');

  useEffect(()=>{
    FetchData("http://localhost:9090/api/v1.0/warehouses/all",setwareHouses);
  },[])

  const submitHandler=(e)=>{
    e.preventDefault();
    props.setIsLoggedIn(true);
    props.setWarehouseName(selectedWarehouse);
    props.setWarehouseId(selectedWarehouseId);
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
