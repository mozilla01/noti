import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Signup from './components/Signup.jsx';
import Error from './components/Error.jsx';
import Login from './components/Login.jsx';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <Signup />,
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
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
