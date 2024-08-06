import React, { useEffect, useState } from 'react';
import '../styles/Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ supplierName: '', phone: '', category: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/suppliers/all');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1.0/categories/all');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEdit 
      ? `http://localhost:9090/api/v1.0/suppliers/all/update`
      : `http://localhost:9090/api/v1.0/suppliers/all/add`;
    const method = isEdit ? 'PUT' : 'POST';

    const body = isEdit 
      ? { supplierId: editId, ...form }
      : { ...form };

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setAlertMessage(`Supplier ${isEdit ? 'updated' : 'added'} successfully :)`);
      setTimeout(() => {
        setAlertMessage('');
      }, 4000);
      fetchSuppliers();
      setForm({ supplierName: '', phone: '', category: '' });
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'adding'} supplier:`, error);
    }
  };

  const handleEdit = (supplier) => {
    setForm({
      supplierName: supplier.supplierName,
      phone: supplier.phone,
      category: supplier.category.categoryId,
    });
    setIsEdit(true);
    setEditId(supplier.supplierId);
  };

  const handleDelete = async (supplierId) => {
    try {
      const response=await fetch(`http://localhost:9090/api/v1.0/suppliers/all/${supplierId}`, {
        method: 'DELETE',
      });
      if(response.ok){

        setAlertMessage('Product deleted successfully!!');
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);
      }
      else{
        setAlertMessage("You cann't delete this supplier :(");
        setTimeout(() => {
          setAlertMessage('');
        }, 4000);
      }
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
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
      <div id="suppliersContainer">
        <h1>Suppliers</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="supplierName"
            value={form.supplierName}
            onChange={handleChange}
            placeholder="Supplier Name"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplierId}>
                <td>{supplier.supplierId}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.category.categoryName}</td>
                <td>
                  <button className="editButton" onClick={() => handleEdit(supplier)}>Edit</button>
                  <button className="deleteButton" onClick={() => handleDelete(supplier.supplierId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Suppliers;
