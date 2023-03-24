import React,{Suspense} from 'react'
import useSWR from 'swr'

const fetcher=(url,token)=>fetch(url, {
  headers: {
    'token':token,
  }
})
.then((res)=>res.json())
function FetchData(url,token) {
    const {data,error}=useSWR(url,(url) =>
    fetcher(url,token),{suspense:true})
    if(error)
      return <h1>there was an error</h1>

    return data;  
}
  


    

export default FetchData