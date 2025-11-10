import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Properties from "../pages/Properties";
import AddProperties from "../pages/AddProperties";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path:'/properties',
        element:<Properties/>
      },
      {
        path:'/add-property',
        element:<AddProperties/>
      },
      {
        path:'/my-properties',
        element:<MyProperties/>
      },
      {
        path:'/my-ratings',
        element:<MyRatings/>
      },
      {
        path:'/login',
        element:<Login/>
      }
    ]
  }])