import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function SellerAvatar() {
    let formData = new FormData();
    const navigate=useNavigate();
    const {id}=useParams();
    const onChangeFunction=(e)=>{
        
   
        if(e.target&&e.target.files[0]){
        formData.append('file',e.target.files[0])
        
       
        
        }
    }

    const handleSubmit=(e)=>{
        fetch(`http://localhost:5001/seller/create/avatar/${id}`,
         { method: 'POST',
         headers:{token: localStorage.token},
         body: formData })
        .then(res => res.json())
        .then((data)=>{  
           console.log(data) 
           
        })
        .catch((err)=>console.log(err)
        )
        navigate('/seller/sellerPage');
    }
    
  return (
    <div>
        
     <form onSubmit={handleSubmit}>
     <h2>Upload the main image for the product</h2>

     
        <input id="avatar" name="avatar" type="file" onChange={onChangeFunction} />
        <br></br>
        <button>Upload Image</button>
      </form>


    
    </div>
  )
}

export default SellerAvatar