import {useAuth0} from '@auth0/auth0-react';
import React, {  useState } from 'react';
import Axios from 'axios';

export const RegisterForm = (props) =>{
    return(
        <>
        <h1>Register</h1>
        <form className='register-form' method="POST" action='http://localhost:3001/create' encType='multipart/form-data' onSubmit ={ev =>{
          ev.preventDefault();
          window.location.reload(true)
          }}>


            <label>Username</label>
            <input type="text" name="username" required/>
            <label>Bio</label>
            <textarea name='bio'/>
            <input type="file" name="pfp"></input>
            <input type="hidden" name="id" value={props.id}></input>
            <input type="submit" value="upload"></input>
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
        <h1>Log in</h1>
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


export const DeleteAccountBtn = (props) => {
  const {logout, isAuthenticated} = useAuth0();

  function deleteAcc(id){
    Axios.post('http://localhost:3001/userdelete', {
      firstName: id,
      
    })
    .then(function (response) {
      logout();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
      isAuthenticated &&(
      <div>
          <button onClick={() => deleteAcc(props.id)}>
              Delete Account
          </button>

      </div>
  ))


}

export const Profile = (props) => {
    
    const [userid, setUserId] = useState("")
    const [username, setUserName] = useState("")
    const [userbio, setUserBio] = useState("")
    const [userpfp, setUserPfp] = useState("default-profile.jpg")
    Axios.get('http://localhost:3001/check'+props.id, {
      params: {id: props.id},
    }).then((res) =>{
      const object = Object.values(JSON.parse(JSON.stringify(res)));
      
      if(typeof object[0][0] !== 'undefined'){
        console.log("Result:" + object[0][0]["pfp"])
        setUserId(object[0][0]["userid"])
        setUserName(object[0][0]["username"])
        setUserBio(object[0][0]["bio"]) 
        setUserPfp(object[0][0]["pfp"])
      }
    })
    
      if(props.isAuthenticated){
        console.log("PFP:" + userpfp)
        return(
          <>
          {userid.length === 0 &&(<RegisterForm id={props.id}/>)}
            
            <>
            <div className='profile'>
            <div className='name-pfp'>
            <img src={require('/home/arlemar/Documents/reactcrum/client/src/img/' + userpfp)} alt="some text" className='pfp'/>
            <h2>{username}</h2></div>
            <p className='bio'>{userbio}</p>
            <DeleteAccountBtn id={userid}/>
            </div>
            </>
            
            
          </>
        )}
      //terrible conditional rendering at it's finest

    
  };