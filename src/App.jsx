import './App.css';
import SalesOrders from './pages/SalesOrders';
import { useState} from 'react';

import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import Products from './pages/Products';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warehouseName, setWarehouseName] = useState(null);
  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout warehouseName={warehouseName} >
      <Routes>
      <Route exact path="/" Component={Products}>
      </Route>
      <Route path="/about" Component={SalesOrders}>
      </Route>
    </Routes>
    </MainLayout>:<Login setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
