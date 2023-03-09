import React from 'react'

import ProductList from './ProductList';
import useSWR from 'swr'

function Home() {
  const fetcher=(...args)=>fetch(...args).then((res)=>res.json())
 const {data,error}=useSWR("http://localhost:5001/resources/trending/5/1",fetcher,{suspense:true})
   
  return (
    <div>
      {error?<h1>there was an error</h1>:null}
     {data?<ProductList data={data}/>:<div>data not found</div>}
       
    </div>
  )
}

export default Home

//  {error?<h1>there was an error</h1>:null}
//{data?<ProductList data={data}/>:<div>data not found</div>}


