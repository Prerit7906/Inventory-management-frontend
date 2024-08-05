import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateOrAddPurchaseOrder = ({ warehouseId, setIsUpdating, isUpdating, order, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [quantity, setQuantity] = useState(order?.quantity || '');
  const [productId, setProductId] = useState(order?.product?.productId || '');
  const [supplierId, setSupplierId] = useState(order?.suppliers?.supplierId || '');
  const [maxStockAlert, setMaxStockAlert] = useState(null);
 

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/${warehouseId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(`Error fetching products for warehouse ${warehouseId}:`, error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/suppliers/all');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9090/api/v1.0/products/all/${productId}`);
      const productData = await res.json();
      const currentStock = productData.unitsInStocks;

      let updatedStock;
      if (isUpdating) {
        const stockDifference = parseInt(quantity) - parseInt(order?.quantity || 0);
        updatedStock = parseInt(currentStock) + parseInt(stockDifference);
      } else {
        updatedStock = parseInt(currentStock) + parseInt(quantity);
      }

      if (updatedStock >= 2500) {
        setMaxStockAlert(`Stock of ${productData.productName} is more than maximum level, Couldn't place order`);
        setTimeout(() => {
          setMaxStockAlert('');
        }, 4000);
        return;
      }

    try {
      const url = isUpdating
        ? `http://localhost:9090/api/v1.0/purchase/purchaseid/${order.purchaseId}`
        : `http://localhost:9090/api/v1.0/purchase/new/${supplierId}/${productId}`;
      const method = isUpdating ? 'PUT' : 'POST';

      const requestBody = {
        quantity,
        product: { productId },
        suppliers: { supplierId }
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        alert(`Failed to ${isUpdating ? 'update' : 'add'} the order`);
        throw new Error("Failed to submit form");
      }
        const updateStockResponse = await fetch(`http://localhost:9090/api/v1.0/products/all/update/units/${productId}/${updatedStock}`, {
          method: 'PUT'
        });

        if (!updateStockResponse.ok) {
          throw new Error("Failed to update product stock");
        }
        alert(`Order ${isUpdating ? 'updated' : 'added'} successfully`);

        setQuantity('');
        setProductId('');
        onSave();
        navigate('/purchaseOrders');
        setIsUpdating(false);
      }catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className='updateSalesOrder'>
      {maxStockAlert && <p>Stock of {maxStockAlert} is more than maximum level, Couldn't place order</p>}
      <h2>{isUpdating ? 'Update' : 'Add'} Purchase Order</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Supplier ID</label>
          <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
            <option value="">Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.supplierName} (ID: {supplier.supplierId})
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Product ID</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.productId} value={product.productId}>
                {product.productName} (ID: {product.productId})
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <div className='form-group'>
            <button id='go-back-button' type="button" onClick={() => { onCancel(); navigate('/purchaseOrders'); }}>Cancel</button>
            <button type="submit">{isUpdating ? 'Update' : 'Add'} Purchase Order</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrAddPurchaseOrder;
