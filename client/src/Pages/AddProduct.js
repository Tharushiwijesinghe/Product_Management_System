import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AddProduct.css'; // Adjust the path if needed


const AddProduct = () => {
  const [product, setProduct] = useState({ id: '', name: '', price: '' });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/getAllProduct');
      console.log('Fetched products:', res.data);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/addProduct', {
        ...product, // Spread the product state to send all fields
        price: Number(product.price), // Ensure price is a number
      });
      fetchProducts(); // Refresh list
      setProduct({ id: '', name: '', price: '' }); // Reset form
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

    const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/products/deleteProduct/${id}');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Add Product</h2>
      <form className="product-form no-background"onSubmit={handleSubmit}>
        <input name="id" value={product.id} onChange={handleChange} placeholder="Product ID" />
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" />
        <input name="price" value={product.price} onChange={handleChange} placeholder="Price" />
        <button type="submit" className="add-btn" >Add</button>
      </form>
      <div className="product-list-container">
        <h3>Product List</h3>
        <ul className="product-list">
          {Array.isArray(products) && products.map((p, index) => (
            <li key={p._id} className="product-item">
              <div className="product-info">
                <span>#{index + 1}</span>
                <span>{p.name}</span>
                <span>Rs.{p.price}</span>
              </div>
              <button className="deleteBtn" onClick={() => handleDelete(p._id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddProduct;