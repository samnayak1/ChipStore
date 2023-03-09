import React from 'react'

import ProductList from './ProductList';
import useSWR from 'swr'
import FetchData from '../FetchData';
function Home() {
  const fetcher=(...args)=>fetch(...args).then((res)=>res.json())
// const {data,error}=useSWR("http://localhost:5001/resources/trending/5/1",fetcher,{suspense:true})
  const data=FetchData("http://localhost:5001/resources/trending/5/1")
  return (
    <div>
      <h1>Trending this month</h1>


      { data.map((product)=>
  <li key={product.product_id}>
   <h3>{product.name}</h3>
   <h5>Original Price :{product.price}</h5>
   <h5>Price after discount: {product.priceafterdiscount}</h5>

   <img src={product.imagename} height={50} width={50}/>
   
  </li>
  
  )
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
