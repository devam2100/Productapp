import React, { useState, useEffect } from 'react';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert('Category name cannot be empty.');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert('Category already exists.');
      return;
    }
    const updatedCategories = [...categories, newCategory.trim()];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    setNewCategory('');
  };

  // Delete a category
  const handleDeleteCategory = (category) => {
    const confirmed = window.confirm(`Are you sure you want to delete the category "${category}"?`);
    if (!confirmed) return;

    const updatedCategories = categories.filter((cat) => cat !== category);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Category Manager</h2>
      
      {/* Add New Category */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ padding: '10px', width: '70%', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={handleAddCategory}
          style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Category
        </button>
      </div>

      {/* List of Categories */}
      <h3>Existing Categories</h3>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map((category, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {category}
              <button
                onClick={() => handleDeleteCategory(category)}
                style={{
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
      )}
    </div>
  );
};

export default CategoryManager;
