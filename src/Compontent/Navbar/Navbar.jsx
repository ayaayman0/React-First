import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand ps-5 h1" to="#">CRUD</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto px-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="h1 text-white nav-link active" aria-current="page" to="">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="h1 text-white nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to=""></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to=""></Link>
            </li>
          </ul>
        
        </div>
      </div>
    </nav>
  </>
}
