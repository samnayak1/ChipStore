import React from 'react'
import Navbar from './Navbar'
import FetchData from '../FetchData'
import { useParams,useNavigate } from 'react-router-dom'

function Product() {
     
    const token=localStorage.getItem('token');
    const {id}=useParams();
    const product=FetchData(`http://localhost:5001/resources/product/${id}`,token)
    console.log('hit')
   
  return (
   
    <div>
       <Navbar/>
        
        <h1>{product.name}</h1>
        <img src={product.imagename} height={50} width={50} alt='mg' />
        <h3>product price: {product.price}</h3>
        <h3>discount: {product.discount}</h3>
        <h3>price after discount: {product.priceafterdiscount}</h3>
        <h3> category: {product.category}</h3>
    
        <h3>seller email: {product.email}</h3>
        <h3> date created: {product.created_time.slice(0,10)}</h3>
        

    </div>
  )
}

export default Product