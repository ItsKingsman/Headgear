import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Component/Main';
import User from './Component/User';
import Particular from './Component/Particular';
import UserDetails from './Component/UserDetails';
import './style.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/particular",
        element: <Particular/>,
      },
      {
        path: "/userdetails",
        element: <UserDetails/>,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);


