import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';

const userDataExists = (user) =>{
    Axios.get('http://localhost:3001/checkifexists', {
    id: user.sub,
  }).then((res) =>{
      if(res){
    return true;}
  })
}



const RegisterForm = (props) =>{
    function addUser() {
        Axios.post('https://localhost:3001/adduser', {
        id: props.id,
        username: uName,
        bio: uBio
        
      }).then((res) =>{
        console.log(res)
      })
      }

    const [uName, setUName] = useState('')
    const [uBio, setUBio] = useState('')
    return(
        <>
        <form>
            <label>Username</label>
            <input type="text" onChange={(e) => setUName(e.target.value)}/>
            <label>Bio</label>
            <input type="text" onChange={(e) => setUBio(e.target.value)}/>
            <button onClick={addUser}>Submit</button>


        </form>
        </>
    )
} 

export const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return(
        !isAuthenticated &&(
        <div>
            <button onClick={() => loginWithRedirect()}>
                Sign in

            </button>

        </div>
    ))
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

export const Profile = () => {
    const {user, isAuthenticated} = useAuth0();

    return(

            isAuthenticated && (
                userDataExists(user) &&(
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.sub}</p>
                    </div>
              )
            ),
            
            isAuthenticated &&(
                !userDataExists(user) &&(
                    <div>
                    <RegisterForm id={user.sub}/>
                    </div>
                )
              )
    )
    
    
    
    
    
}
