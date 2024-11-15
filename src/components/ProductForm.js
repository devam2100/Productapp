import React, { useState, useEffect } from 'react';
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
  });
  const [categories, setCategories] = useState([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
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

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert('Category cannot be empty.');
      return;
    }
    const updatedCategories = [...categories, newCategory.trim()];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    setNewCategory('');
  };

  const handleDeleteCategory = (category) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${category}" category?`);
    if (!confirmed) return;

    const updatedCategories = categories.filter((cat) => cat !== category);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

        {/* Product Title */}
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

        {/* Price */}
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

        {/* Description */}
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

        {/* Category Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
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

        {/* Category Management Button */}
        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setCategoryModalOpen(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: 'purple',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Edit Categories
          </button>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {editingProduct ? 'Update' : 'Submit'}
        </button>
      </form>

      
      {categoryModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
            }}
          >
            <h3>Manage Categories</h3>

            
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category"
                style={{
                  padding: '8px',
                  width: '100%',
                  marginBottom: '10px',
                  borderRadius: '4px',
                }}
              />
              <button
                onClick={handleAddCategory}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                Add Category
              </button>
            </div>

            
            <h4>Existing Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories.map((category, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {category}
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    style={{
                      marginLeft: '10px',
                      padding: '5px 10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCategoryModalOpen(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginTop: '10px',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
