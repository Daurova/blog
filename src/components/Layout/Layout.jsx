import { NavLink, Outlet } from "react-router-dom";
import { Button } from "antd";
import { getUserInfo } from "../../services/services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Layout = ()=>{
  const [user, setUser] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {      
          setUser(true); 
        }
     }
  ,[user])
  
  const handleSignOut = () => {
    // Clear user data from Local Storage and state
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin');
  };

    return(
        <>
      <header>
        <NavLink to='/articles'>Realworld Blog</NavLink>
        <div>{localStorage.getItem('user')}</div>
        <NavLink to='/signin'>
          <Button style={{borderColor: '#ffffff'}}>Sign In</Button>
        </NavLink>
        <NavLink to='/signup'>
          <Button style={{borderColor: '#ffffff'}}>Sign Up</Button>
        </NavLink>
      </header>  
      <main className="container">
      <Outlet/>
      </main>
      <footer>footer</footer>
      </>
      )
}
{/* <>
      <header>
        <NavLink to='/articles'>Realworld Blog</NavLink>
        {user ? (
         <div>{localStorage.getItem('user')}</div>
          <Button style={{ borderColor: '#ffffff' }} onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <>
            <NavLink to='/signin'>
              <Button style={{ borderColor: '#ffffff' }}>Sign In</Button>
            </NavLink>
            <NavLink to='/signup'>
              <Button style={{ borderColor: '#ffffff' }}>Sign Up</Button>
            </NavLink>
          </>
        )}
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  ); */}
export default Layout