import { NavLink, Outlet } from "react-router-dom";
import { Button } from "antd";

const Layout = ()=>{
    return(
        <>
      <header>
        <NavLink to='/articles'>Realworld Blog</NavLink>
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

export default Layout