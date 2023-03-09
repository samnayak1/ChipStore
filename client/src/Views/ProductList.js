import React from 'react'

function ProductList([data]) {
  console.log(data);
  return (
    <div>
          <h2>Trending this month</h2>
          {
          data.map((product)=>
           <li key={product.product_id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
           </li>
           
           )
              
             
         }    

          
      
    </div>
  )
}

export default ProductList


