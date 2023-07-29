import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    let [user,setUser] = useState({username:"" ,password:""})
    let [error,setError] = useState("")
    let navigate = useNavigate()

    let {username,password} = user

    async function implementLogin(){

        if(!username || !password){
            setError("Please fill all the fields")
            return;
        }

        try{
            const response = await axios.post('https://dummyjson.com/auth/login',{
                username,password,
                headers:{
                    "Content-Type": "application/json"
                }
            })
            setError("")
            localStorage.setItem('userDetails',JSON.stringify(response.data))
            navigate('/profile')
        }
        catch(error){
            setError(error.response.data.message)
        }

    }

    return(
        <div className="login-page">
            <div className="login-form">
                {error && <h3 className="error-msg">{error}...</h3>}
                <div>
                    <p className="welcome-msg">Welcome back!</p>
                    <h3>Sign in to ur account</h3>
                </div>
                <div>
                    <label for="username">Username</label>
                    <input id="username"type="text" onChange={(e)=>setUser({...user,username:e.target.value})} value={username}/>
                </div>
                <div> 
                    <label for="password">Password</label>
                    <input id="password" type="password" onChange={(e)=>setUser({...user,password:e.target.value})} value={password}/>
                </div>
                <button onClick={implementLogin}>Continue</button>
                <p className="forget-msg">Forget your password?</p>
            </div>
            <div>
                <p className="msg">
                    Dont have an account? <span>Sign up</span>
                </p>
            </div>
        </div>
    )

}
    
export default Login