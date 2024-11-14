import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product || null;

  const [formData, setFormData] = useState({
    id: editingProduct?.id || Date.now(),
    title: editingProduct?.title || '',
    price: editingProduct?.price || '',
    description: editingProduct?.description || '',
    category: editingProduct?.category || '',
    image: editingProduct?.image || null,
  });

  
  const categories = ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Furniture'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (editingProduct) {
      
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? formData : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      
      localStorage.setItem('products', JSON.stringify([...products, formData]));
    }
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          Product Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            rows="4"
            required
          ></textarea>
        </label>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          Upload Image:
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: '5px' }}
            accept="image/*"
          />
        </label>
      </div>
      
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
        {editingProduct ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default ProductForm;
