import React, { useEffect, useState } from 'react'
import axios from 'axios'


const  Profile = () => {

    let [userInfo,setUserInfo] = useState({})
    let [error,setError] = useState("")

    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    console.log(userDetails)
    
    useEffect(() => {
        axios.get(`https://dummyjson.com/users/${userDetails.id}`)
        .then(response => {
            setUserInfo(response.data)
            localStorage.setItem('userInfo',JSON.stringify(response.data))
            setError("");
        })
        .catch(error => setError(error.repsonse.data.message))
    },[])

    return(
        <div>
            <div className="user-details">
            {error && <h3 classname="error-msg">{error}</h3>}
            <div >
                <h1>Welcome {userInfo.firstName} {userInfo.lastName} !...</h1>
                <div className="more-details">
                    <p><span>First Name: </span>{userInfo.firstName}</p>
                    <p><span>Last Name: </span>{userInfo.lastName}</p>
                    <p><span>DOB: </span>{userInfo.birthDate}</p>
                    <p><span>Age: </span>{userInfo.age}</p>
                    <p><span>Gender: </span>{userInfo.gender}</p>
                    <p><span>Phone: </span>{userInfo.phone}</p>
                    <p><span>Email: </span>{userInfo.email}</p>
                </div>
            </div>
            <div >
                <img src={userInfo.image}/>
            </div>
        </div>
        <p className="thanq-msg">Thank You...</p>
        </div> 
    )

}
    
export default Profile 