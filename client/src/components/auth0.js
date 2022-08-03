import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';

export const RegisterForm = (props) =>{
    const [uName, setUName] = useState('')
    const [uBio, setUBio] = useState('')
    function addUser() {
        Axios.post('http://localhost:3001/create', {
        id: props.id,
        username: uName,
        bio: uBio  
      }).then((err, res) =>{
        if(err){
        console.log(res)
        }
        else{
            console.log(err)
        }
      })
      }

    
    return(
        
        <>
        <h1>Register</h1>
        <form onSubmit ={ev =>{ev.preventDefault()}}>
            <label>Username</label>
            <input type="text" onChange={(event) => setUName(event.target.value)}/>
            <label>Bio</label>
            <input type="text" onChange={(event) => setUBio(event.target.value)}/>
            <button onClick={addUser} type="submit">Submit</button>
        </form>
        </>
    )
} 

export const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return(
      <>
        {!isAuthenticated &&(
          <>
        <h1></h1>
        <div>
            <button onClick={() => loginWithRedirect()}>
                Sign in

            </button>

        </div>
        </>
    )}
    </>
    )
}

export const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();
    return(
        isAuthenticated &&(
        <div>
            <button onClick={() => logout()}>
                Sign out
            </button>

        </div>
    ))


}

export const Profile = (props) => {
    
    const [userid, setUserId] = useState("")
    const [username, setUserName] = useState("")
    const [userbio, setUserBio] = useState("")
    Axios.get('http://localhost:3001/check'+props.id, {
      params: {id: props.id},
    }).then((res) =>{
      const object = Object.values(JSON.parse(JSON.stringify(res)));
      console.log(object[0][0]["username"])
      setUserId(object[0][0]["userid"])
      setUserName(object[0][0]["username"])
      setUserBio(object[0][0]["bio"]) 
    })
    console.log(username, userbio)
      if(userid !== props.id){
        return(<RegisterForm id={props.id} authenticated={props.authenticated}/>)
      }else{
        return(
          <>
            <h1>Profile</h1>
            <h2>{username}</h2>
            <p>{userbio}</p>
          </>
        )
      }


    
  };
