import { NavLink, Outlet } from "react-router-dom";
import { Button } from "antd";
import { getUserInfo } from "../../services/services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Layout = ()=>{
  const {userDetails, setUserDetails}=useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user')
  useEffect(()=>{
     getUserInfo(token)
  }, [token])

  
  
  const handleSignOut = () => {
    // Clear user data from Local Storage and state
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  };
  const handleProfileClick = () => {
    navigate('/profile'); // Перенаправление на страницу профиля
  };
    return(
        <>
      <header>
        <NavLink to='/articles'>Realworld Blog</NavLink>
        {token?(<>
                <div onClick={handleProfileClick}>{localStorage.getItem('user')}
                  <img src= {user.image} alt="user avatar"style={{ width: '20%', height: '20%' }}></img>
                </div>
                <NavLink to='/articles'>
                  <Button style={{borderColor: '#ffffff'}}
                          onClick = {handleSignOut}>
                    Sign Out
                  </Button>
                </NavLink>
                </>
        ):(
          <>
        <NavLink to='/signin'>
          <Button style={{borderColor: '#ffffff'}}>Sign In</Button>
        </NavLink>
        <NavLink to='/signup'>
          <Button style={{borderColor: '#ffffff'}}>Sign Up</Button>
        </NavLink>
        </>)
        }
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