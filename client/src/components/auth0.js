import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';

Axios.defaults.timeout = 10000;

const userDataExists = (user) =>{
    Axios.get('http://localhost:3001/checkifexists', {
    id: JSON.stringify(user.sub),
  }).then((res) =>{
      if(res.userid === JSON.stringify(user.sub)){
    return true
    }
    else
    {

        return false
    }
  })
}



const RegisterForm = (props) =>{
    const [uName, setUName] = useState('')
    const [uBio, setUBio] = useState('')
    function addUser() {
        Axios.post('http://localhost:3001/create', {
        id: props,
        username: uName,
        bio: uBio
        
      }).then((err, res) =>{
        if(err){
        console.log(res)
        }
        else{
            console.log(err)
        }
      }).catch(error => {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    });
      }

    
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
                    <RegisterForm id={JSON.stringify(user.sub)}/>
                    </div>
                )
              )
    )
    
    
    
    
    
}
