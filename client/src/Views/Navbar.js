import React, { useContext} from 'react'
import { AuthContext } from '../AuthContextProvider';
import { Link, useNavigate} from "react-router-dom";
import logo from './Logo.PNG';
function Navbar() {
  const {isLoggedIn,setisLoggedIn}=useContext(AuthContext);
  const navigate=useNavigate();
  return (
    <div>
   <Link to="/">
    <img src={logo} width={100} height={100} alt='mg'></img>
    </Link> 
   <button onClick={()=>{
    if(isLoggedIn){
      localStorage.removeItem('token');
      navigate('/');
    }
    else{
      navigate('/login');
    }
     
    
    setisLoggedIn(!isLoggedIn)}
   }>
    {isLoggedIn?"logout":"login"}
  
   </button>
   
   </div>
  )
}

export default Navbar