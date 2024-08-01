import React, { useState } from 'react';
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate=useNavigate();
    const [password,setPassword]=useState('');
  const [formData, setFormData] = useState({
    warehouseName: '',
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const fetchWarehouseIdUsingUserNameAndPassword=async (url)=>{
    const response = await fetch(url);
    const responseData=await response.json();
    if(response.ok){
        console.log("Inside response "+responseData);

        props.setWarehouseId(responseData);
        return responseData;
    }
    return null;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password===formData.password){
        try {
            const response = await fetch('http://localhost:9090/api/v1.0/warehouses/all', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
           if(response.ok){
            fetchWarehouseIdUsingUserNameAndPassword(`http://localhost:9090/api/v1.0/warehouses/check-credentials/${formData.userName}/${formData.password}`);
            props.setWarehouseName(formData.warehouseName);
            props.setIsLoggedIn(true);
            navigate('/home')
           }
          } catch (error) {
            console.error('Error:', error);
          }
    }
else{
    alert("Password and confirm password didn't match")
}
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
          placeholder='Warehouse name'
            type="text" 
            name="warehouseName" 
            value={formData.warehouseName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
          placeholder='User name'
            type="text" 
            name="userName" 
            value={formData.userName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
          placeholder='Password'
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
          placeholder='Confirm Password'
            type="password" 
            name="confirm-password" 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} 
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <br></br>
      <Link to={'/'}>sign in?</Link>
    </div>
  );
};

export default Signup;
