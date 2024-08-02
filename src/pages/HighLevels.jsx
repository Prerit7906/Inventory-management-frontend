import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';
import ProductsDetails from './ProductDetails';
import { Link, useNavigate } from 'react-router-dom';

const HighLevels = (props) => {
  const [highProducts, setHighProducts] = useState([]);
  const [minimumLevel, setMinimumLevel] = useState(2500);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [minimumLevel]);

  const fetchProducts = async () => {
    try {
      console.log("warehouse id : " + props.warehouseId);
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/${props.warehouseId}/${minimumLevel}`);
      const data = await response.json();
      setHighProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMinimumLevel(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="product-container">
      <form onSubmit={handleSubmit}>
        <h4>Minimum Inventory Level : {minimumLevel}</h4>
        <label>
          Enter Minimum Level:
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {highProducts.length > 0 ? (
            highProducts.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.unitsInStocks}</td>
                <td>{product.category.categoryId}</td>
                <td>{product.category.categoryName}</td>
                <td>
                  <Link to={`/products/${product.productId}`}>View Details</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HighLevels;
