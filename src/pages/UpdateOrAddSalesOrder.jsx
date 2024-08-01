import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/UpdateOrAddSalesOrder.css"

const UpdateOrAddSalesOrder = ({ warehouseId,setIsUpdating, isUpdating, order, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(order?.quantity || '');
  const [productId, setProductId] = useState(order?.product?.productId || '');

  useEffect(() => {
    fetchProducts();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isUpdating
        ? `http://localhost:9090/api/v1.0/salesOrders/all/update/${productId}/${order.salesOrderId}`
        : `http://localhost:9090/api/v1.0/salesOrders/all/${productId}`;
      const method = isUpdating ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        alert(`Failed to ${isUpdating?'update':"add"} the order`);
        throw new Error("Failed to submit form");
      }
      setQuantity('');
      setProductId('');
      onSave();
      navigate('/salesOrders');
      alert(`Order ${isUpdating?'updated':"added"} successfully`);
      // prerit here 
      setIsUpdating(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className='updateSalesOrder'>
      <h2>{isUpdating ? 'Update' : 'Add'} Sales Order</h2>
      <form onSubmit={handleSubmit}>
        {/* prerit here  */}
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
        {/* prerit here  */}
        <div className='form-group'>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          {/* prerit from here  */}
          <div className='form-group'>
        <button id='go-back-button' type="button" onClick={() => { onCancel(); navigate('/salesOrders'); }}>Cancel</button>
        <button type="submit">{isUpdating ? 'Update' : 'Add'} Sales Order</button>
        </div>
        {/* to here  */}
        </div>
      </form>
    </div>
  );
};

export default UpdateOrAddSalesOrder;
