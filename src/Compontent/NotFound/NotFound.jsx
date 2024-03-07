import React from 'react'
import notFound from "./Screenshot.png"
export default function NotFound() {
  return<>
    <h1 className='mt-5'>
      Not Found
      This page doesn’t exist.
      If this is a mistake, let us know, and we will try to fix it!
    </h1>
    <img src={notFound} alt="" /> 
  </>
}
