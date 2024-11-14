import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleEdit = (product) => {
    navigate('/', { state: { product } });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found. Add some!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
        Add New Product
      </button>
    </div>
  );
};

export default ProductList;
