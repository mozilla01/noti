import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import RegForm from './components/RegForm.jsx';
import Error from './components/Error.jsx';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegForm />,
    errorElement: <Error />,
  },
  {
    path: '/notepad',
    element: <App />,
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
