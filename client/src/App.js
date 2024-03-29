import React,{useState} from 'react';

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Views/Home' 
import Login from './Views/Login'
import Register from './Views/Register'
import { Suspense } from 'react';
import { AuthContext } from './AuthContextProvider';
import OTP from './Views/OTP';
import Product from './Views/Product';
import SellerLogin from './Views/SellerLogin';
import SellerOTP from './Views/SellerOTP';
import SellerPage from './Views/SellerPage';
import SellerCreate from './Views/SellerCreate';
import SellerAvatar from './Views/SellerAvatar';
function App() {
  const[isLoggedIn,setisLoggedIn]=useState(false);
  return (
    <div className="App">
   <AuthContext.Provider value={{isLoggedIn,setisLoggedIn}}>
     <BrowserRouter>
       <Suspense fallback={<h1>...Loading</h1>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register/otp/:id" element={<OTP/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path='/seller/login' element={<SellerLogin/>} />
          <Route path='/seller/sellerPage' element={<SellerPage/>} />
          <Route path='/seller/sellerCreate' element={<SellerCreate/>} />
         <Route path='/seller/upload/avatar/:id' element={<SellerAvatar/>} />
      

           
          
        </Routes>

        </Suspense>
     
     </BrowserRouter>
     </AuthContext.Provider>
    
     </div>
    
  );
}

export default App;
