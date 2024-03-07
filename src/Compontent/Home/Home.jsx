import React from 'react'
import img from "./img.jpg"
import { Link } from 'react-router-dom'


export default function Home(props) {

  return <>
  <div className="text-center row">
    <img src={img} className='w-50 mt-5 mx-auto col-sm-6 d-grid' /> 
    <div className="offset-sm-3 col-sm-6 d-grid mt-5">
      <button type='button' className='btn btn-outline-primary mb-3'>
        <Link to="products" className='list-group-item h4'>Let's Goo</Link>
      </button>
    </div>
  </div>
  </>
}


