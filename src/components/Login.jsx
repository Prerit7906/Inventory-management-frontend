import React from 'react';
import '../styles/Login.css'

const Login = (props) => {
  const submitHandler=(e)=>{
    e.preventDefault();
    props.setIsLoggedIn(true);
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="warehouse">Warehouse</label>
          <select id="warehouse" name="warehouse">
            <option value="warehouse1">Warehouse 1</option>
            <option value="warehouse2">Warehouse 2</option>
            <option value="warehouse3">Warehouse 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
