import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSearch from './searchBar';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); 

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDelete = () => {
    const updatedProducts = products.filter((product) => product.id !== confirmDeleteId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setConfirmDeleteId(null); 
  };

  const handleEdit = (product) => {
    navigate('/', { state: { product } });
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <>
      <div>
        <ProductSearch />
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Product List</h2>
        {products?.length === 0 ? (
          <p>No products found. Add some!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products?.map((product) => (
              <li
                key={product.id}
                style={{
                  marginBottom: '20px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <h3>{product.id}</h3>
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                <div>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      marginRight: '10px',
                      padding: '5px 10px',
                      backgroundColor: 'green',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(product.id)} // Show confirmation dialog
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
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add New Product
        </button>
      </div>

      {confirmDeleteId !== null && (
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
              textAlign: 'center',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p>Are you sure you want to delete this product?</p>
            <button
              onClick={handleDelete}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
