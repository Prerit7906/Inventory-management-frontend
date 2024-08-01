// src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    unitPrice: '',
    unitsInStocks: '',
    categoryId: '',
    warehouseId: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/products/all/' + formData.categoryId + '/' + formData.warehouseId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: formData.productName,
          description: formData.description,
          unitPrice: parseFloat(formData.unitPrice),
          unitsInStocks: parseInt(formData.unitsInStocks, 10),
        }),
      });

      if (response.ok) {
        alert('Product added successfully');
        navigate('/viewproducts');
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Price</label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitsInStocks">Stock</label>
          <input
            type="number"
            id="unitsInStocks"
            name="unitsInStocks"
            value={formData.unitsInStocks}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category ID</label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="warehouseId">Warehouse ID</label>
          <input
            type="text"
            id="warehouseId"
            name="warehouseId"
            value={formData.warehouseId}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
