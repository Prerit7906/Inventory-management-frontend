import React, { useEffect, useState } from 'react';
import "../styles/AlertMessages.css";

const AlertMessages = ({ warehouseId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/getInventory/${warehouseId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.reverse()); // Reverse the product list
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [warehouseId]);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.productId !== productId));
  };

  return (
    <div className="alert-container">
      {products.map(product => (
        <div key={product.productId} className="alert-message">
          {product.unitsInStocks <= 500 ? (
            <p>{product.productName} is low in stock. Please fill it ASAP.</p>
          ) : (
            <p>{product.productName} is overstocked. Please don't fill it now.</p>
          )}
          <button onClick={() => handleDelete(product.productId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AlertMessages;
