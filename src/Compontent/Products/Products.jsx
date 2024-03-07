import React, { useEffect, useState } from 'react'

export default function Products() {
  const [content, setContent]=useState(<ProductList showForm={showForm}/>)

  function showList() {
    setContent(<ProductList showForm={showForm}/>)
  }

  function showForm(product) {
    setContent(<ProductForm product={product} showList={showList}/>)
  }

  return <>
   {content}
  </>
}

function ProductList(props) {
  const [products, setProduct]=useState([]);

  function fetchProducts() {
    fetch('https://mock-jsonserver-lado.onrender.com/products/')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unexpected Server Response");
      }
      return response.json()
    })
    .then((data) => {setProduct(data)})
    .catch((err) => console.log("Error: ",err));
  }

  useEffect(()=>fetchProducts(), []);  

  function deleteProduct(id){
    fetch('https://mock-jsonserver-lado.onrender.com/products/' + id,{
      method: "DELETE",
    })
      .then((response) => {response.json()})
      .then((data) => fetchProducts())
  }

  return(<>
  <div className="container">
    <h2 className='text-center mb-3 mt-3'>List of Products</h2>
    <button type='button' onClick={()=>props.showForm({})} className='btn btn-primary w-25 mb-3'>Create New Product</button>
    <button type='button' onClick={()=>fetchProducts()} className='btn btn-outline-primary mb-3 ms-3'>Refresh</button>
    
    <table className="table mx-auto">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Price</th>
        <th>Description</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        products.map((product, index)=>{
          return(
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><button onClick={()=>props.showForm(product)} class="btn btn-outline-warning">Edit</button></td>
              <td><button onClick={()=> deleteProduct(product.id)} class="btn btn-outline-danger">Delete</button></td>
            </tr>
          );
        })
      }
    </tbody>
  </table>
  </div>
  </>); 
}

function ProductForm(props) {

  const [errMessage, setErrMessage]=useState("")
  
  function handleSubmit(event) {
    event.preventDefault();

    const formData=new FormData(event.target)

    const product=Object.fromEntries(formData.entries())

    if (!product.name || !product.brand || !product.category || !product.price) {
      setErrMessage(
        <div className="alert alert-danger col-lg-11 text-center" role="alert">
          Please, enter all the required fields!
        </div>
      )
      return
    }

    if (props.product.id) {
      fetch('https://mock-jsonserver-lado.onrender.com/products/' + props.product.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Network Error")
        }
        return response.json()
      })
      .then((data) => props.showList())
      .catch((err) => console.log("Error: ",err));
    }
    else{
      fetch('https://mock-jsonserver-lado.onrender.com/products/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error")
        }
        return response.json()
      })
      .then((data) => props.showList())
      .catch((err) => console.log("Error: ",err));
    }
}

  return(<>
    <h2 className='text-center mb-5 mt-3'>{props.product.id ? "Edit Product" : "Create New Products"}</h2>
  
    <div className="col-lg-4 mx-auto ">

      {errMessage}

      <form onSubmit={(event)=> handleSubmit(event)} >
        {props.product.id && <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>ID</label>
          <div className="col-sm-8">
            <input type="text"className='form-control-plaintext' name='id' readOnly defaultValue={props.product.id} />
          </div>
        </div>}

        <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>Name</label>
          <div className="col-sm-8">
            <input type="text"className='form-control' name='name' defaultValue={props.product.name} />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>Brand</label>
          <div className="col-sm-8">
            <input type="text"className='form-control' name='brand' defaultValue={props.product.brand} />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>Category</label>
          <div className="col-sm-8">
            <select type="text"className='form-select' name='category' defaultValue={props.product.category} >
              <option value="Other">Other</option>
              <option value="Phones">Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="Cameras">Cameras</option>
              <option value="Accessories">Accessories</option>
              <option value="Network-Devices">Network Devices</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>Price</label>
          <div className="col-sm-8">
            <input type="text"className='form-control' name='price' defaultValue={props.product.price} />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="" className='col-sm-3 col-form-label'>Description</label>
          <div className="col-sm-8">
            <textarea type="text"className='form-control' name='description' defaultValue={props.product.description} />
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-3 col-sm-4 d-grid">
            <button type='submit' className='btn btn-primary'>Save</button>
          </div>
          <div className="col-sm-4 d-grid">
          <button type='button' onClick={()=>props.showList()} className='btn btn-secondary'>Cancel</button>
          </div>
        </div>
      </form>
    </div>

  </>); 
}
