import React from 'react'
import { useNavigate } from 'react-router-dom';
import  {useFormik}  from 'formik';
function SellerCreate() {
  const navigate = useNavigate();
  const formik=useFormik({
    
    initialValues:{
      name:'',
      price:'',
      discount:'',
      category:'',
      quantity:''
    },


  

    onSubmit:async (values)=>{
      console.log(values)
      const create=await fetch('http://localhost:5001/seller/create',{
        method:"POST",
        headers:{token:localStorage.token,
        "Content-type":'application/json'},
        body:JSON.stringify(values)
        
      })
      console.log(create)
      navigate('/seller/sellerPage')
    }
  })

  return (
     <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Add a product to ChipStore</h2>
       <input 
       id='name'
      name="name" 
      placeholder="Enter name of product"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.name} />   
       
  
      <br></br>
      <input 
       id='price'
      name="price" 
      placeholder="Enter price of product"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.price} />   
       
  
      <br></br>
      <input 
       id='discount'
      name="discount" 
      placeholder="Enter discount.0 if none"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.discount} />   
       
  
      <br></br>
      <input 
       id='category'
      name="category" 
      placeholder="Enter category of product"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.category} />   
       
  
      <br></br>
      <input 
       id='quantity'
      name="quantity" 
      placeholder="Enter quantity of product"
      type="number" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.quantity} />   
       
  
      <br></br>
     
       
      

      <button id='submit' disabled={!(formik.isValid && formik.dirty)}>submit</button>
      </form>

    </div>
  )
}

export default SellerCreate