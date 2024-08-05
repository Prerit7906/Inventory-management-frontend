import "./App.css";
import SalesOrders from "./pages/SalesOrders";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/Login";
import ViewProducts from "./pages/ViewProducts";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import UpdateOrAddSalesOrder from "./pages/UpdateOrAddSalesOrder";
import Category from "./pages/Category";
import Signup from "./components/Signup";
import Suppliers from "./pages/Suppliers";
import LowLevels from "./pages/LowLevels";
import AlertMessages from "./pages/AlertMessages";
import PurchaseOrders from "./pages/PurchaseOrders";
import UpdateOrAddPurchaseOrder from "./pages/UpdateOrAddPurchaseOrder";
import HighLevels from "./pages/HighLevels";
import UploadedImages from "./pages/UploadedImages";
import Barcodes from "./pages/Barcodes";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warehouseName, setWarehouseName] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating1, setIsUpdating1] = useState(false);
  const [order, setOrder] = useState(null);
  const [order1, setOrder1] = useState(null);
  const [value, setValue] = useState('');
  const handleEditOrder = (order) => {
    setOrder(order);
    setIsUpdating(true);
  };
  const handleEditOrder1 = (order) => {
    setOrder1(order);
    setIsUpdating1(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        // prerit here
        <MainLayout
          warehouseName={warehouseName}
          setIsLoggedIn={setIsLoggedIn}
          warehouseId={warehouseId}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/notifications"
              element={<AlertMessages warehouseId={warehouseId} />}
            />
            <Route
              path="/salesOrders"
              element={
                <SalesOrders
                  setIsUpdating={setIsUpdating}
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
            <Route
              path="/purchaseOrders"
              element={
                <PurchaseOrders
                  warehouseId={warehouseId}
                  onEditOrder={handleEditOrder1}
                />
              }
            />
            <Route
              path="/purchaseOrders/addOrUpdate"
              element={
                <UpdateOrAddPurchaseOrder
                  warehouseId={warehouseId}
                  setIsUpdating={setIsUpdating1}
                  isUpdating={isUpdating1}
                  order={order1}
                  onSave={() => setOrder1(null)}
                  onCancel={() => setOrder1(null)}
                />
              }
            />
            <Route
              path="/viewproducts"
              element={<ViewProducts warehouseId={warehouseId} />}
            ></Route>
            <Route
              path="/products/:productId/barcode"
              element={<Barcodes value={value} />}
            ></Route>
            <Route
              path="/lowproducts"
              element={<LowLevels warehouseId={warehouseId} />}
            ></Route>
            <Route
              path="/highproducts"
              element={<HighLevels warehouseId={warehouseId} />}
            ></Route>
            {/* prerit here  */}
            <Route
              path="/addproduct"
              element={<AddProduct warehouseId={warehouseId} />}
            />
            <Route path="/products/:productId" element={<ProductDetails setValue={setValue} />} />
            <Route
              path="/products/:productId/images"
              element={<UploadedImages />}
            />
            {/* prerit here  */}
            <Route path="/categories" element={<Category />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route
            path="/signup"
            element={
              <Signup
                setWarehouseId={setWarehouseId}
                setWarehouseName={setWarehouseName}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login
                setWarehouseId={setWarehouseId}
                setWarehouseName={setWarehouseName}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
