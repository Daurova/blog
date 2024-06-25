import { useState, useEffect } from "react"
import { getUserInfo, userLogin } from "../services/services"

export const useAuth = ()=>{
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError]= useState(null)
    const [token, setToken] = useState(null)

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
            const userDetails = await getUserInfo(userData.token) 
            console.log(userDetails) 
            setUser(userDetails)
            setIsAuth(true)
            }
           setIsLoading(false)
    }
    return{
        auth, isAuth, user, isLoading, token   }
}
//в useeffect get token  from lc, before auth()9str