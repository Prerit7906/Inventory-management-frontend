import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';
import { Link, useNavigate } from 'react-router-dom';

const ViewProducts = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("warehouse id : "+props.warehouseId);
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/${props.warehouseId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  return (
    <div className="product-container">
       <div className="header-buttons">
        <button onClick={() => navigate('/addproduct')} className="add-product-button">Add New Product</button>
      </div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { products!= null ? products.map(product => (
            <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>{product.productName}</td>
            <td>{product.description}</td>
            <td>&#8377;{product.unitPrice}</td>
            <td>{product.unitsInStocks}</td>
            <td>
            <Link to={`/products/${product.productId}`}>View Details</Link>
            </td>
            </tr>
          )):
            <tr> <td colSpan={6}>No products available</td></tr>
          }
        </tbody>
      </table>

      
    </div>
  );
};

export default ViewProducts;