import React,{ useContext} from 'react'
import {useFormik} from 'formik'
import { AuthContext}  from '../AuthContextProvider';
import {useNavigate,useParams } from 'react-router-dom'
import * as Yup from 'yup'
function OTP() {
    const {setisLoggedIn}=useContext(AuthContext);
    let { id } = useParams();
    const navigate=useNavigate();
    const formik=useFormik({
    
        initialValues:{
            otp:""
        },

        validationSchema: Yup.object({
            otp:Yup.string()
                .max(6,"Must be 6 characters")
                .min(6,"Must be 6 characters")
                .required("Required")
        }),

        onSubmit:(values)=>{
            
            fetch(`http://localhost:5001/auth/register/verify/${id}`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)
                
            })
            .then((res)=>{return res.json()})
            .then((data)=>{
                console.log(data);
                localStorage.setItem('token',data.token);
                setisLoggedIn(true)
                navigate('/')
            })
            .catch((err)=>{console.log(err)})
        }

    })
  return (
    <div>
        <h2>OTP page</h2>
        <p>Enter your OTP sent to your registered email</p>
    <form onSubmit={formik.handleSubmit}>
    <input id="otp"
     name="otp" 
     placeholder="Enter OTP here"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.otp} />
       <br></br>
        <button id="submit" type="submit">submit</button>
    </form>
    </div>
  )
}

export default OTP