import React, { Children, useEffect } from 'react'
import { createContext ,useState} from 'react'
export const Useauth=createContext();

function UserAuthorCon({children}) {
    let[curr,setcurr]=useState({
        firstName:"",
        lastName:"",
        email:"",
        profileImg:"",
        role:"",
        report:0,

    })
    // let [g,setG]=useState(null)
    useEffect(()=>{
      const userInstorage=localStorage.getItem("userData");
      if(userInstorage){
        setcurr(JSON.parse(userInstorage))
      }
    },[])
  return (
    <Useauth.Provider value={{curr,setcurr}}>
        {children}
    </Useauth.Provider>
  )
}

export default UserAuthorCon