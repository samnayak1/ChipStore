import React from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
function Register() {
   
    const navigate = useNavigate();
    
        const formik=useFormik({
    
            initialValues:{
                firstName:"",
                lastName:"",
                phone:"",
                email:"",
                password:"",
                street:"",
                pincode:"",
                state:"",
                country:""

            },
            validationSchema: Yup.object({
                firstName:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required"),
                 lastName:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required"),
                phone:Yup.string()
                    .max(10,"Must be less than 10 characters")
                    .required("Required"),
                email:Yup.string()
                    .email("must be email")
                    .required("Required"),
                password:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required"),
                street:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required"),
                pincode:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required"),
                state:Yup.string()
                    .max(30,"Must be less than 30 characters")
                    .required("Required"),
                country:Yup.string()
                    .max(15,"Must be less than 15 characters")
                    .required("Required")

            }),

            onSubmit:async (values)=>{
                await fetch('http://localhost:5001/auth/register/sendotp',{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(values)
                })
                .then((res)=>{
                return res.json()})
                .then((data)=>{
                     console.log(data)
                   
                    navigate(`/register/otp/${data.rows[0].user_id}`)
                })
                .catch((err)=>{console.log(err)})
            }
    
    
        })

 
    const login = () =>{
        navigate('/login')
    }
  
   


  return (
    <div>
    <button id="login" onClick={(e)=>{
       login() }}>Existing user? Sign in</button>
    <h2>Register</h2>
    <form onSubmit={formik.handleSubmit}>
    <input id="firstName"
     name="firstName" 
     placeholder="Enter firstName"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.firstName} />
       <br></br>
       {formik.errors.firstName&&formik.touched.firstName?<p>{formik.errors.firstName}</p>:null}
      <input id="lastName"
     name="lastName" 
     placeholder="Enter lastName"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.lastName}   /> 
      <br></br>
      {formik.errors.lastName&&formik.touched.lastName?<p>{formik.errors.lastName}</p>:null}
      <input id="phone"
     name="phone" 
     placeholder="Enter phone number"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.phone} />
       <br></br>
       {formik.errors.phone&&formik.touched.phone?<p>{formik.errors.phone}</p>:null}

       <input id="email"
     name="email" 
     placeholder="Enter email"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.email} />
       <br></br>
       {formik.errors.email&&formik.touched.email?<p>{formik.errors.email}</p>:null}

       <input id="password"
     name="password" 
     placeholder="Enter password"
      type="password" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.password} />
       <br></br>

       {formik.errors.password&&formik.touched.password?<p>{formik.errors.password}</p>:null}


       <input id="street"
     name="street" 
     placeholder="Enter street"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.street} />
       <br></br>
       {formik.errors.street&&formik.touched.street?<p>{formik.errors.street}</p>:null}


       <input id="pincode"
     name="pincode" 
     placeholder="Enter pincode"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.pincode} />
       <br></br>
       {formik.errors.pincode&&formik.touched.pincode?<p>{formik.errors.pincode}</p>:null}



       <input id="state"
     name="state" 
     placeholder="Enter state"
      type="text" 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.state} />
       <br></br>
       {formik.errors.state&&formik.touched.state?<p>{formik.errors.state}</p>:null}



       <input id="country"
     name="country" 
     placeholder="Enter country"
      type="text" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur}
      value={formik.values.country} />
       <br></br>
       {formik.errors.country&&formik.touched.country?<p>{formik.errors.country}</p>:null}

   <button id="submit" type="submit" disabled={!(formik.isValid && formik.dirty)} >submit</button>
   
    </form>


    </div>
  )
}

export default Register
//onClick={(e)=>{goToOTP()}}


/* const goToOTP = () =>{
    navigate('/register/otp/')
} */
/* firstName:firstName,
lastName:lastName,
phone:phone,
 email:email,
password:password,
street:street,
pincode:pincode,
state:state,
country:country}=req.body; */

