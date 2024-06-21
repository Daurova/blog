import { NavLink, Outlet } from "react-router-dom";

const Layout = ()=>{
    return(
        <>
      <header>
        <NavLink to='/articles'>Realworld Blog</NavLink>
        <NavLink to='/signin'>Sign in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
      </header>  
      <main className="container">
      <Outlet/>
      </main>
      <footer>footer</footer>
      </>
      )
}

export default Layout