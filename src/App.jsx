import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Compontent/Layout/Layout';
import Products from './Compontent/Products/Products.jsx';
import Home from './Compontent/Home/Home.jsx';
import NotFound from './Compontent/NotFound/NotFound.jsx';


let routers=createBrowserRouter([

  {path:"" ,element:<Layout/> , children:[
    {index:true ,element:<Home/>},
    {path:"products" , element:<Products/>},
    
  {path:"*" , element:<NotFound/>}
  ]}
])

export default function App() {
  return <>
  <RouterProvider router={routers}>
  </RouterProvider>
  
  </>
}