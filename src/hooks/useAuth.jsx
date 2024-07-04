import { useState, useEffect } from 'react'
import { userLogin } from '../services/services'
import { useNavigate } from 'react-router-dom'

export const useAuth = ()=>{
    const [isAuth, setIsAuth] = useState(false)
    const [user] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError]= useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token', 'user');
        if (token) {
         console.log(token, user)

        }
      
    }, [token]);

    const auth = async(authForm)=>{
        setIsLoading(true)
        const userData = await userLogin({email:authForm.email, password:authForm.password})
        if (userData){
            localStorage.setItem('token', userData.token)
            setToken(userData.token)
            
            // const userDetails = await getUserInfo(userData.token) 

            // console.log(' user details=', userDetails, 'token=', userData.token)
            // setUser(userDetails)
            setIsAuth(true)
            navigate('/articles')
            }
           setIsLoading(false)
    }
    return{
        auth, isAuth, user, isLoading, token   }
}
//в useeffect get token  from lc, before auth()9str