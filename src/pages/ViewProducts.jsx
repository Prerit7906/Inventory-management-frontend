import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';
import ProductsDetails from './ProductDetails';
import { Link, useNavigate } from 'react-router-dom';

const ViewProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  // const [productName, setProductName] = useState('');
  // const [productDescription, setProductDescription] = useState('');
  // const [unitPrice, setUnitPrice] = useState('');
  // const [unitsInStock, setUnitsInStock] = useState('');
  // const [categoryId, setCategoryId] = useState('');
  // const [warehouseId, setWarehouseId] = useState('');

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

  // const handleEdit = async () => {
  //   if (selectedProduct) {
  //     try {
  //       await fetch(`http://localhost:9090/api/v1.0/products/all/${selectedProduct.productId}/${categoryId}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           ...selectedProduct,
  //           productName,
  //           description: productDescription,
  //           unitPrice,
  //           unitsInStocks: unitsInStock,
  //           category: { categoryId },
  //           warehouse: { warehouseId }
  //         }),
  //       });
  //       fetchProducts();
  //     } catch (error) {
  //       console.error('Error updating product:', error);
  //     }
  //   }
  // };

  // const handleDelete = async (productId) => {
  //   try {
  //     await fetch(`http://localhost:9090/api/v1.0/products/all/${productId}`, {
  //       method: 'DELETE',
  //     });
  //     fetchProducts();
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

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
          {products.map(product => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>${product.unitPrice}</td>
              <td>{product.unitsInStocks}</td>
              <td>
              <Link to={`/products/${product.productId}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default ViewProducts;