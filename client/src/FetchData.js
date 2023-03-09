import React, { Suspense } from 'react'
import useSWR from 'swr'

const fetcher=(...args)=>fetch(...args).then((res)=>res.json())
function FetchData(url) {
    const {data,error}=useSWR(url,fetcher,{suspense:true})
    if(error)
      return <h1>there was an error</h1>

    return data;  
}
  


    

export default FetchData