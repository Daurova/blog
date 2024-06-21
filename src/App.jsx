import './App.css';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn';
import  SignUp  from './pages/SignUp';
import  Blog  from './pages/Mainpage';
import  NotFound from './pages/Notfoundpage';
import SinglePage from './pages/SinglePage';
import Layout from './components/Layout/Layout';

const App = () =>{
 
  return (
    <>
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path = 'articles' element={<Blog/>}/>
          <Route path = '/' element={<Blog/>}/>
          <Route path="articles:slug" element={<SinglePage/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route  path="signup" element={<SignUp/>}/>
          <Route  path="*" element={<NotFound/>}/>  
        </Route>
      </Routes>
      
    </div>
  
    </>
    );
}

export default App;
