import React from 'react'
import { useNavigate } from 'react-router-dom';
import FetchData from '../FetchData';
import Navbar from './Navbar';

function SellerPage() {
  const token=localStorage.getItem('token');
 const navigate=useNavigate();
   const products=FetchData(`http://localhost:5001/seller/getproducts`,token)
   console.log('hit')
   const addDiscount=(id)=>{
       
   }
   const removeDiscount=(id)=>{
       
   }
   const addAvatar=(id)=>{
         
        navigate(`/seller/upload/avatar/${id}`)
   }
   const createFunction=()=>{
     navigate('/seller/sellerCreate')
   }

   const productList=products.product
  return (
    <div>
      <Navbar/>
      <button onClick={()=>createFunction()}>Add a product</button>
      <div className='productList'>
     { 
      productList? productList.map((product)=>(
             <div key={product.product_id}>
                <h2>{product.name}</h2>
                <img src={product.imagename} alt='product(not uploaded)' height={200} width={200}></img>
                <h5>price:{product.price}</h5>
                <h5>price after discount:{product.priceafterdiscount}</h5>
                <h5>category: {product.category}</h5>
                <h5>discount:{product.discount}</h5>
                <h5>available:{product.available}</h5>
                <button id='addDiscount' onClick={()=>addDiscount(product.product_id)}>add discount</button>
                <button id='removeDiscount' onClick={()=>removeDiscount(product.product_id)}>remove discount</button>
                <button id='addAvatar'  onClick={()=>addAvatar(product.product_id)}>Add a photo</button>
     
             </div> 
     

        
      )) :<div><h2>No products found</h2></div>
      
     }

      </div>
      
    </div>
  )
}

export default SellerPage