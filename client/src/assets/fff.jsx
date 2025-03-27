import React, { useContext,useEffect,useState} from 'react'
import { Useauth } from '../../context/UserAuthorCon'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
  const {curr,setcurr}=useContext(Useauth)
  const {isSignedIn,user,isLoaded}=useUser()
  const [error,setError]=useState("")
  const navigate = useNavigate();
  console.log("isSignedIn :",isSignedIn)
  useEffect(()=>{
    setcurr((prev)=>({
      ...prev,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImg:user?.imageUrl

    }))

  },[isLoaded])

  useEffect(()=>{
    if(curr?.role=="user"&&error.length==0){
      navigate(`/User-profile/${curr.email}`);
    }
    if(curr?.role=="author"&& error.length==0){
      console.log("first")
      navigate(`/author-profile/${curr.email}`);
    }
  },[curr?.role])
  // funtion on select role
  async function onSelectRole(e){
    setError("")//clears error whenever we select the role
    const selec=e.target.value;
    curr.role=selec

    try{
    let res=null;
    if(selec=='author'){
      res=await axios.post('http://localhost:3010/author-api/author',curr)
      let {message,payload}=res.data;
      if(message=='author'){
        setcurr({...curr,...payload})
      }
      else{
        setError(message);
      }
    }
    if(selec=='user'){
      res=await axios.post('http://localhost:3010/user-api/user',curr)
      let {message,payload}=res.data;
      if(message=='user'){
        setcurr({...curr,...payload})
      }
      else{
      setError(message);}

    }}
    catch (err) {
      setError('Error connecting to server');
    }



  }
  return (
    <div>{
      isSignedIn==false&& <div>
        <p className='lead'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dignissimos?</p>
        <p className='lead'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dignissimos?</p>
        <p className='lead'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dignissimos?</p>
      </div>

    }{
      isSignedIn==true&&
      <div><div className='d-flex justify-content-evenly bg-danger p-2 align-items-center'>
        <img src={user.imageUrl} width="80px" className="rounded-circle" alt="" />
        <p className="display-4">{user.firstName}</p>
      </div>
      <p>select role</p>
      {error.length!=0&&(
        <p className='text-danger fs-5' style={{fontFamily:"sans-serif"}}>{error}</p>
      )}
      <div className='d-flex role-radio justify-content-center  bg-info'>
        <div className='form-check p-3'>
          <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole}/>
          <label htmlFor="author" className='form-check-label'>Author</label>
        </div>
        <div className='form-check p-3'>
          <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole}/>
          <label htmlFor="author" className='form-check-label'>User</label>
        </div>
       
      </div>
      </div>
    }</div>
  )
}

export default Home