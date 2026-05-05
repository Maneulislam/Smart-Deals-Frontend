import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './components/home/Home.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import MyBids from './components/MyBids/MyBids.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import CreateProduct from './components/MyBids/CreateProduct/CreateProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home

      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "myBids",
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "create-product",
        element: <PrivateRoute><CreateProduct></CreateProduct></PrivateRoute>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
