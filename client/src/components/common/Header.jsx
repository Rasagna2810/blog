import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import Ani from '../../assets/Ani.json';
import Lottie from 'lottie-react';
import { GoMoon } from "react-icons/go";
import { FaSun } from "react-icons/fa6";
import { Useauth } from '../../context/UserAuthorCon';
import { ThemeContext } from '../../context/ThemeProvider';

function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { curr, setcurr } = useContext(Useauth);
  const {theme,toggleTheme}=useContext(ThemeContext);
  const navigate = useNavigate();

  // Function for signout
  async function handleSignout() {
    try {
      await signOut();
      setcurr(null);
      navigate('/');
    } catch (error) {
      console.error('Signout failed:', error);
    }
  }
  async function handleprof() {
    try{
      navigate('/Profile');
    }
    catch(error){
      console.log('error in profile')
    }
    
  }

  return (
    <div className='aa'>
      <nav className='header'>
        <div className='w-25'>
          <Link to='/'>
            <div className='w-50 ms-2 mt-2'>
              <Lottie animationData={Ani} loop={true} className='w-25 h-25' />
            </div>
          </Link>
        </div>
        <div className='role'>
             {theme==='light'?
             <button onClick={toggleTheme} className='btn '><GoMoon  style={{color:"blue", size:"24px"}}/></button>:
             <button onClick={toggleTheme} className='btn '><FaSun style={{ color: "yellow", fontSize: "30px" }} /></button>
             }
            {!isSignedIn ? (
                <ul className='role yy'>
                <li>
                  <Link to='' className='text-decoration-none jj'>Home</Link>
                </li>
                <li>
                  <Link to='signin' className='text-decoration-none jj'>Signin</Link>
                </li>
                <li>
                  <Link to='signup' className='text-decoration-none jj'>Signup</Link>
                </li>
              </ul>
            ) : (
              <div >
                 <button onClick={handleprof} className='btn prof'><img src={user.imageUrl} width='40px' className='rounded-circle' alt='' /></button> 
                <button className='btn sign jj' onClick={handleSignout}>
                  Signout
                </button>
              </div>
            )}
         
        </div>
      </nav>
    </div>
  );
}

export default Header;
