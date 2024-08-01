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
import Category from './pages/Category';
import Signup from './pages/Signup';
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
      // prerit here 
      <MainLayout warehouseName={warehouseName} setIsLoggedIn={setIsLoggedIn}  warehouseId={warehouseId}>
      <Routes>
      <Route path='/home'element={<Home/>}/>
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
      {/* prerit here  */}
      <Route path="/addproduct" element={<AddProduct warehouseId={warehouseId} />} /> 
      <Route path="/products/:productId" element={<ProductDetails />} />
      {/* prerit here  */}
      <Route path="/categories" element={<Category />} />
      
      
    </Routes>
    </MainLayout>:
    <Routes>
      <Route path="/signup" element={<Signup setWarehouseId={setWarehouseId} setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn} />} />
      <Route exact path="/" element={<Login setWarehouseId={setWarehouseId} setWarehouseName={setWarehouseName} setIsLoggedIn={setIsLoggedIn}/> }>
      </Route>
    </Routes>
    }
    </div>
  );
}

export default App;
