import './App.css';
import SalesOrders from './pages/SalesOrders';
import { useEffect, useState} from 'react';

import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import ViewProducts from './pages/ViewProducts';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warehouseName, setWarehouseName] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);
  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout warehouseName={warehouseName}  warehouseId={warehouseId}>
      <Routes>
      <Route exact path="/" element={<Home/>}>
      </Route>
      <Route path="/about" Component={SalesOrders}>
      </Route>
      <Route path="/viewproducts"  element={<ViewProducts warehouseId={warehouseId}/>}></Route>
      <Route path="/addproduct" element={<AddProduct />} /> 
      <Route path="/products/:productId" element={<ProductDetails />} />
    </Routes>
    </MainLayout>:<Login setWarehouseId={setWarehouseId} setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
