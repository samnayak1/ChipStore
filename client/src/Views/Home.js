import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import FetchData from '../FetchData';
function Home() {
  const token=localStorage.getItem('token')
  const trending=FetchData("http://localhost:5001/resources/trending/5/1",token)
 
  return (
    <div>
      <Navbar/>

      <h1>Trending this month</h1>
  { trending?trending.map((product)=>
  <li key={product.product_id}>
   <h3>{product.name}</h3>
   <h5>Original Price :{product.price}</h5>
   <h5>Price after discount: {product.priceafterdiscount}</h5>
   <Link to={`product/${product.product_id}`}><h5>visit product</h5></Link>
   <img src={product.imagename} height={50} width={50} alt='mg'/>
   
  </li>
  
  ):<div><h5>no results found</h5></div>
}
     
       
    </div>
  )
}

export default Home

//  {error?<h1>there was an error</h1>:null}
//{data?<ProductList data={[data]}/>:<div>data not found</div>}

/* 
{ data.map((product)=>
  <li key={product.product_id}>
   <h3>{product.name}</h3>
   <h5>Original Price :{product.price}</h5>
   <h5>Price after discount: {product.priceafterdiscount}</h5>

   <img src={product.imagename} height={50} width={50}/>
   
  </li>
  
  )
} */
