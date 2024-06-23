import { Navigate } from "react-router-dom";


const SignUpUser = ({children})=>{
    const signedUp = true
    if(signedUp === false){
        return <Navigate to='/signup' />
    }else{
    return children}
}

export default SignUpUser