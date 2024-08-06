import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';
import ProductsDetails from './ProductDetails';
import { Link, useNavigate } from 'react-router-dom';

const InventoryReport = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sum,setSum ] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // calculateValue();
  }, []);

  useEffect(() => {
    const calculateValue = () => {
      let totalSum = 0;
      products.forEach(product => {
        totalSum += (product.unitPrice * product.unitsInStocks);
      });
      setSum(totalSum);
    };
  
    calculateValue();
  }, [products]);

  const fetchProducts = async () => {
    try {
      console.log("warehouse id : "+props.warehouseId);
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/${props.warehouseId}`);
      const data = await response.json();
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const generatePdf = ()=> { 

  }

  

  

  return (
    <div className="product-container">
      <h1>Inventory Report</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        { products!= null ? products.map(product => (
            <tr key={product.productId}>
            <td>{product.productName}</td>
            <td>&#8377;{product.unitPrice}</td>
            <td>{product.unitsInStocks}</td>
            <td>&#8377;{product.unitPrice * product.unitsInStocks}</td>
            </tr>
          )
        ):
            <tr> <td colSpan={6}>No products available</td></tr>
          }
        </tbody>
        <h3>Total Value: ${sum}</h3>
      </table>
        {/* <button onClick={() => generatePdf()}></button> */}
      
    </div>
  );
};

export default InventoryReport;