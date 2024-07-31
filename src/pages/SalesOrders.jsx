import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "../styles/SalesOrders.css"

const SalesOrders = ({ warehouseId ,onEditOrder}) => {
  const [salesOrders, setSalesOrders] = useState([]);
  const navigate = useNavigate();
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
    onEditOrder(order);
    navigate('/salesOrders/addOrUpdate');
  };

  return (
    <div className='salesOrdersMain'>
      <Link to="/salesOrders/addOrUpdate">Add a Sales Order</Link>
      <div>
        <h3>List of Sales Orders</h3>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Id</th>
            <th>Category</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map(order => (
            <tr key={order.salesOrderId}>
              <td>{order.salesOrderId}</td>
              <td>{order.product.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.product.productId}</td>
              <td>{order.product.category.categoryName}</td>
              <td>{order.orderDate}</td>
              <td>
              <button onClick={() => handleEdit(order)}>Edit</button>
              <button onClick={() => handleDelete(order.salesOrderId)}>Delete</button>
              </td>
            </tr>
          ))}
        {/* </ul> */}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrders;
