import './App.css';
import SalesOrders from './pages/SalesOrders';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import Products from './pages/Products';
import ViewProducts from './pages/ViewProducts';
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
      {isLoggedIn ? (
        <MainLayout warehouseName={warehouseName}>
          <Routes>
            <Route exact path="/" Component={Products} />
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
              path="/products/viewProducts"
              element={<ViewProducts warehouseId={warehouseId} />}
            />
            <Route
              path="/salesOrders/addOrUpdate"
              element={
                <UpdateOrAddSalesOrder
                  warehouseId={warehouseId}
                  isUpdating={isUpdating}
                  order={order}
                  onSave={() => setOrder(null)}
                  onCancel={() => setOrder(null)}
                />
              }
            />
          </Routes>
        </MainLayout>
      ) : (
        <Login
          setWarehouseId={setWarehouseId}
          setWarehouseName={setWarehouseName}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;
