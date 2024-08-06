import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// prerit from here 
import '../styles/AddProduct.css';

const AddProduct = ({ warehouseId }) => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    unitPrice: '',
    unitsInStocks: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/v1.0/categories/all');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
// to here 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(formData.unitsInStocks>=3000 || formData.unitsInStocks<=0){
      setAlertMessage("This stock cann't be added");
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);      
        return;
    }
    try {
      // prerit here changed the warehouseID
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/${formData.categoryId}/${warehouseId}`, {
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
        setAlertMessage('Product added successfully :)');
        setTimeout(() => {
          setAlertMessage('');
          navigate('/viewproducts');
        }, 4000);
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
    {alertMessage && (
        <div id="alertMessage">
          {alertMessage}
          <div id="progressBar"></div>
        </div>
      )}
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit} className="add-product-form">
        {/* prerit from here */}
        <div className="form-group">
          <label htmlFor="categoryId">Category:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}(Id: {category.categoryId})
              </option>
            ))}
          </select>
        </div>
        {/* to here */}
        <div className="form-group">
          <label htmlFor="productName">Name:</label>
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
          <label htmlFor="description">Description:</label>
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
          <label htmlFor="unitPrice">Price:</label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleInputChange}
            required
            />
        </div>
        <div className="form-group">
          <label htmlFor="unitsInStocks">Stock:</label>
          <input
            type="number"
            id="unitsInStocks"
            name="unitsInStocks"
            value={formData.unitsInStocks}
            onChange={handleInputChange}
            required
            />
        </div>
        {/* prerit from here wrapped the buttons in div and some more */}
        <div className="form-group">
          <button id='go-back-button' onClick={() => navigate('/viewproducts')} >Go Back</button>
          <button type="submit">Add Product</button>
        </div>
        {/* to here  */}
      </form>
    </div>
    </>
  );
};

export default AddProduct;
