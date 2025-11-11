import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Properties from "../pages/Properties";
import AddProperties from "../pages/AddProperties";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import SingleProp from "../pages/SingleProp";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
       {
        path:'/',
        index:true,
        element: 
          
            <Home />,
            loader:()=>fetch('http://localhost:5000/propertis'),
            
         
      },
      {
        path:'/properties',
        element: 
          
            <Properties/>,
            loader:()=>fetch('http://localhost:5000/propertis')
         
      },
      {
          path:'/single-property/:id',
          element:(<PrivateRoute>
            <SingleProp>
            </SingleProp>
          </PrivateRoute>),
          loader: ({params}) => fetch(`http://localhost:5000/propertis/${params.id}`)
      },
      {
        path:'/add-property',
        element:
        (<PrivateRoute>
          <AddProperties/>
        </PrivateRoute>)
      },
      {
        path:'/my-properties',
        element:
        (<PrivateRoute>
        <MyProperties/>
        </PrivateRoute>)
      },
      {
        path:'/my-ratings',
        element:
         (<PrivateRoute>
        <MyRatings/>
        </PrivateRoute>)
        
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
  }])