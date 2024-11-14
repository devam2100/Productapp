import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/Productlist';
// Define your routes
const routes = [
  { path: '/', element: <ProductForm /> },
  { path: '/products', element: <ProductList /> },
];

// Create the router with the `future` flag
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Opt into React Router v7's startTransition behavior
  },
});

const App = () => {
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
