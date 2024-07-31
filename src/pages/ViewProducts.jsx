import React, { useState, useEffect } from 'react';
import '../styles/ViewProducts.css';

const ViewProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitsInStock, setUnitsInStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');

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

  const handleEdit = async () => {
    if (selectedProduct) {
      try {
        await fetch(`http://localhost:9090/api/v1.0/products/all/${selectedProduct.productId}/${categoryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedProduct,
            productName,
            description: productDescription,
            unitPrice,
            unitsInStocks: unitsInStock,
            category: { categoryId },
            warehouse: { warehouseId }
          }),
        });
        fetchProducts();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:9090/api/v1.0/products/all/${productId}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-container">
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
                <button onClick={() => setSelectedProduct(product)}>Edit</button>
                <button onClick={() => handleDelete(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Units In Stock"
            value={unitsInStock}
            onChange={(e) => setUnitsInStock(e.target.value)}
          />
          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Warehouse ID"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          />
          <button onClick={handleEdit}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;