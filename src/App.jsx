import './App.css';
import SalesOrders from './pages/SalesOrders';
import { useEffect, useState} from 'react';

import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import Products from './pages/Products';
import ViewProducts from './pages/ViewProducts';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warehouseName, setWarehouseName] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);
  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout warehouseName={warehouseName}  warehouseId={warehouseId}>
      <Routes>
      <Route exact path="/" Component={Products}>
      </Route>
      <Route path="/about" Component={SalesOrders}>
      </Route>
      <Route path="/viewProducts"  element={<ViewProducts warehouseId={warehouseId}/>}></Route>
    </Routes>
    </MainLayout>:<Login setWarehouseId={setWarehouseId} setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
