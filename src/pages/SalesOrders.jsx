import React, { useEffect, useState } from 'react';

const SalesOrders = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState('');
  const [salesOrderId, setSalesOrderId] = useState(null); // For updating
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const fetchSalesOrders = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/salesOrders/all');
      const data = await response.json();
      setSalesOrders(data);
    } catch (error) {
      console.error("Error fetching sales orders:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isUpdating
        ? `http://localhost:9090/api/v1.0/salesOrders/all/update/${productId}/${salesOrderId}`
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
        throw new Error("Failed to submit form");
      }

      setQuantity('');
      setProductId('');
      setSalesOrderId(null);
      setIsUpdating(false);
      fetchSalesOrders();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1.0/salesOrders/all/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error("Failed to delete sales order");
      }

      fetchSalesOrders();
    } catch (error) {
      console.error("Error deleting sales order:", error);
    }
  };

  const handleEdit = (order) => {
    setQuantity(order.quantity);
    setProductId(order.product.productId);
    setSalesOrderId(order.salesOrderId);
    setIsUpdating(true);
  };

  return (
    <div>
      <h2>Sales Orders</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Product ID</label>
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <button type="submit">{isUpdating ? 'Update' : 'Add'} Sales Order</button>
      </form>

      <h3>List of Sales Orders</h3>
      <ul>
        {salesOrders.map(order => (
          <li key={order.salesOrderId}>
            {order.quantity} - {order.product.productId}
            <button onClick={() => handleEdit(order)}>Edit</button>
            <button onClick={() => handleDelete(order.salesOrderId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesOrders;
