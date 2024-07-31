import './App.css';
import SalesOrders from './pages/SalesOrders';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import ViewProducts from './pages/ViewProducts';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import UpdateOrAddSalesOrder from './pages/UpdateOrAddSalesOrder';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warehouseName, setWarehouseName] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [order, setOrder] = useState(null);

  const handleEditOrder = (order) => {
    setOrder(order);
    setIsUpdating(true);
  };

  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout warehouseName={warehouseName}  warehouseId={warehouseId}>
      <Routes>
      <Route exact path="/" element={<Home/>}>
      </Route>
      <Route
              path="/salesOrders"
              element={
                <SalesOrders
                  warehouseId={warehouseId}
                  onEditOrder={handleEditOrder}
                />
              }
            />
            <Route
              path="/salesOrders/addOrUpdate"
              element={
                <UpdateOrAddSalesOrder
                  warehouseId={warehouseId}
                  setIsUpdating={setIsUpdating}
                  isUpdating={isUpdating}
                  order={order}
                  onSave={() => setOrder(null)}
                  onCancel={() => setOrder(null)}
                />
              }
            />
      <Route path="/viewproducts"  element={<ViewProducts warehouseId={warehouseId}/>}></Route>
      <Route path="/addproduct" element={<AddProduct />} /> 
      <Route path="/products/:productId" element={<ProductDetails />} />
    </Routes>
    </MainLayout>:<Login setWarehouseId={setWarehouseId} setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
