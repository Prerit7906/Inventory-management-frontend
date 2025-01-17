import React, { useState, useEffect } from 'react';
import '../styles/Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/categories/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });

      if (response.ok) {
        setAlertMessage("Category added successfully :)");
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);
        setCategoryName('');
        fetchCategories(); 
      } else {
        console.error('Error adding category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1.0/categories/all/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlertMessage(`Category deleted successfully!!`);
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);
        fetchCategories(); 
      } else {
        setAlertMessage(`You cannot delete this category because a product of this category is present`);
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);
        console.error('Error deleting category', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <>
      {alertMessage && (
        <div id='alertMessage'>
          {alertMessage}
          <div id='progressBar'></div>
        </div>
      )}
      <div className='categoryMain'>
        <h2>Manage Categories</h2>
        <form onSubmit={handleAddCategory}>
          <input
            type='text'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='Enter category name'
            required
          />
          <button type='submit'>Add Category</button>
        </form>

        <h3>All Categories</h3>
        <table>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button onClick={() => handleDeleteCategory(category.categoryId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
