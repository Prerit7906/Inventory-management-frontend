import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';

const ViewProducts = () => {
  // let unkown = "unkown";
  const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [productName, setProductName] = useState('');
  // const [productDescription, setProductDescription] = useState('');
  // const [unitPrice, setUnitPrice] = useState('');
  // const [unitsInStock, setUnitsInStock] = useState('');
  // const [categoryId, setCategoryId] = useState('');
  // const [warehouseId, setWarehouseId] = useState('');
  // const [warehouseName, setWarehouseName] = useState('');
  // const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
        fetch('http://localhost:9090/api/v1.0/products/all/warehouse/1')
            .then(response => response.json())
            .then(result => {setProducts(result);
          console.log(result);
          })
            .catch(error => console.error('Error fetching data:', error));
            
    }, []);
  
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('http://localhost:9090/api/v1.0/products/all/warehouse/1');
  //     const data = await response.json();
  //     setProducts(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
    
  // };

  console.log(products);
  

  return (
    <div className="product-container">
      <h1>{Array.isArray(products) && products.length ? products[0].warehouse.warehouseName : "Unkown"} Warehouse</h1>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            {/* <th>Warehouse Id</th>
            <th>Warehouse Name</th> */}
            <th>Category Id</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(products) ? (
            products.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>${product.unitPrice}</td>
                <td>{product.unitsInStocks}</td>
                {/* <td>{product.warehouse.warehouseId}</td>
                <td>{product.warehouse.warehouseName}</td> */}
                <td>{product.category.categoryId}</td>
                <td>{product.category.categoryName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
