import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css'; // Ensure you import the CSS file

const ProductDetails = () => {
  const { productId } = useParams();
  const numericProductId = Number(productId);
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    unitPrice: '',
    unitsInStocks: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/v1.0/products/all/${numericProductId}`);
        const data = await response.json();
        setProduct(data);
        setFormData({
          unitPrice: data.unitPrice,
          unitsInStocks: data.unitsInStocks
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [numericProductId]);

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
      console.log(product);
      const response = await fetch(`http://localhost:9090/api/v1.0/products/all/update/product/${numericProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          unitPrice: parseFloat(formData.unitPrice),
          unitsInStocks: parseInt(formData.unitsInStocks, 10)
        }),
      });
      

      if(response.ok) {
        console.log(response);
        setIsEditing(false);
        console.log("EFadfa");
        navigate('/viewproducts');
      } else {
       
        console.error('Error updating product detail:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product details:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:9090/api/v1.0/products/all/${numericProductId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Product deleted successfully');
          navigate('/viewproducts'); // Redirect to product listing or another relevant page
        } else {
          console.error('Error deleting product:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
    
      <h2>Product Details</h2>
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="edit-form">
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
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <table className="product-table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{product.productId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{product.productName}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{product.description}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${product.unitPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Stock</th>
                <td>{product.unitsInStocks}</td>
              </tr>
              <tr>
                <th>Warehouse</th>
                <td>{product.warehouse.warehouseName}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{product.category.categoryName}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={() => navigate('/viewproducts')}>Go Back</button>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
