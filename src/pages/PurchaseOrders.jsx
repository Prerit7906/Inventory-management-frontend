import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const PurchaseOrders = ({ warehouseId ,onEditOrder}) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1.0/purchase/all/purchases/${warehouseId}`);
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1.0/purchase/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error("Failed to delete purchase order");
      }
      fetchPurchaseOrders();
    } catch (error) {
      console.error("Error deleting purchase order:", error);
    }
  };

  const handleEdit = (order) => {
    onEditOrder(order);
    navigate('/purchaseOrders/addOrUpdate');
  };

  return (
    <div className='salesOrdersMain'>
      <button onClick={()=>{navigate('/purchaseOrders/addOrUpdate');}} >Add a Puchase order</button>
      <div>
        <h3>List of Purchase Orders</h3>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Id</th>
            <th>Supplier Id</th>
            <th>Category</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map(order => (
            <tr key={order.purchaseId}>
              <td>{order.purchaseId}</td>
              <td>{order.product.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.product.productId}</td>
              <td>{order.suppliers.supplierId}</td>
              <td>{order.product.category.categoryName}</td>
              <td>{order.date}</td>
              <td>
              {/* <button onClick={() => handleEdit(order)}>Edit</button> */}
              <button id='deleteBtn' onClick={() => handleDelete(order.purchaseId)}>Delete</button>
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

export default PurchaseOrders;
