import React,{ useContext} from 'react'
import {useFormik} from 'formik' 

import { AuthContext } from '../AuthContextProvider';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
function Login() {
    const {setisLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    const formik=useFormik({

        initialValues:{
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            email:Yup.string()
            .email("must be email")
            .required("Required"),
        password:Yup.string()
            .max(15,"Must be less than 15 characters")
            .required("Required")
        }),
            
//http://localhost:5001/auth/login

onSubmit:async (values)=>{
   await fetch('http://localhost:5001/auth/login',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(values)
    })
    .then((res)=>{
        if (!res.ok) {
            if(res.status===404)
            document.getElementById('errorDiv').innerText='User not found';
           if(res.status===401)
           document.getElementById('errorDiv').innerText='Wrong password';
           else if(res.status===500)
           document.getElementById('errorDiv').innerText='oops! The website is broken!:| Our bad ';
           throw new Error(res.status);
        }
       else
       return res.json()})
    .then((data)=>{
        localStorage.setItem('token',data.token);
        console.log(data);
        setisLoggedIn(true)

        navigate('/');
        

    })
    .catch((err)=>{
    //const errMessage=document.getElementById('errorDiv').innerText;
  //   if(err.status==401){
       // errMessage.innerText='Wrong password'
     //}
    console.log(err);
})
}


})

  
    const  register = () =>{
        navigate('/register')
    }
    return (


    <div>
     <button id="register" onClick={(e)=>{
       register() }}>New user? Sign up</button>
    <h2>Login</h2>
    <form onSubmit={formik.handleSubmit}>
   
    <input id="email"
     name="email" 
     placeholder="Enter email"
      type="text" 
      onChange={formik.handleChange} 
      value={formik.values.email} />
       <br></br>

      <input id="password"
     name="password" 
     placeholder="Enter password"
      type="password" 
      onChange={formik.handleChange} 
      value={formik.values.password}   /> 
        <br></br>

   <button id="submit" disabled={!(formik.isValid && formik.dirty)}>submit</button>
   <div id='errorDiv'></div>
    </form>


    </div>
  )
}

export default Login