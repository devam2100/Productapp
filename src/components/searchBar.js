import React, { useState } from 'react';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(null);

  
  let products = [];
  try {
    products = JSON.parse(localStorage.getItem('products')) || [];
  } catch (error) {
    console.error('Error parsing products from localStorage:', error);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!products || products.length === 0) {
      console.warn('No products available in localStorage');
      setFilteredProduct(null);
      return;
    }

    
    const product = products.find(
      (p) =>
        p.id.toString() === searchQuery.trim() || 
        p.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.trim().toLowerCase()) 
    );

    setFilteredProduct(product || null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Search Product by ID, Title, or Category</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Product ID, Title, or Category"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            width: '70%',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {filteredProduct ? (
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <h2>Product Found</h2>
          <p>
            <strong>ID:</strong> {filteredProduct.id}
          </p>
          <p>
            <strong>Title:</strong> {filteredProduct.title}
          </p>
          <p>
            <strong>Price:</strong> ${filteredProduct.price}
          </p>
          <p>
            <strong>Description:</strong> {filteredProduct.description}
          </p>
          <p>
            <strong>Category:</strong> {filteredProduct.category}
          </p>
        </div>
      ) : searchQuery ? (
        <p style={{ color: 'red' }}>
          No product found for: "{searchQuery}"
        </p>
      ) : null}
    </div>
  );
};

export default ProductSearch;
