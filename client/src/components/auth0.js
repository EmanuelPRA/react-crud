import {useAuth0} from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadDropZone from "@rpldy/upload-drop-zone";

export const RegisterForm = (props) =>{
    const [userCreated, SetUserCreated] = useState(false)
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
          SetUserCreated(true)
        }
      })
      
      }
    if(!userCreated){
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
        
    )}else{
      return(
        <ImgUpload id={props.id}/>
        )
    }

    
    
}

export const ImgUpload = (props) =>(

  <Uploady destination={{ url: "http://localhost:3001/upload" + props.id}} >
  <UploadButton/>
  </Uploady>
)

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

export const Profile = (props) => {
    
    const [userid, setUserId] = useState("")
    const [username, setUserName] = useState("")
    const [userbio, setUserBio] = useState("")
    const [userpfp, setUserPfp] = useState("")
    const [firstTime, setFirstTime] = useState(true)
    Axios.get('http://localhost:3001/check'+props.id, {
      params: {id: props.id},
    }).then((res) =>{
      const object = Object.values(JSON.parse(JSON.stringify(res)));
      console.log("Result:" + object[0])
      if(typeof object[0][0] !== 'undefined'){
        
        setUserId(object[0][0]["userid"])
        setUserName(object[0][0]["username"])
        setUserBio(object[0][0]["bio"]) 
        setUserPfp(object[0][0]["pfp"])
      }
    })
    
    console.log(!firstTime)
      if(props.isAuthenticated){
        return(
          <>
          {userid.length === 0 && firstTime &&(<RegisterForm id={props.id}/>)}
            
            <>
            <img src={require("/home/arlemar/Documents/reactcrum/client/src/img/" + userpfp)} alt="some text"/>
            <h1>Profile</h1>
            <h2>{username}</h2>
            <p>{userbio}</p>
            <ImgUpload id={props.id}/>
            </>
            
            
          </>
        )}
      //terrible conditional rendering at it's finest

    
  };