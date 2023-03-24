import React,{createContext,useState} from 'react'

export const AuthContext=createContext();

export const AuthContextProvider=(props)=>{
  const[isLoggedIn,setisLoggedIn]=useState(false);
  return(
      <AuthContext.Provider value={{isLoggedIn,setisLoggedIn}}>
      {props.children}
      </AuthContext.Provider>

  )
}