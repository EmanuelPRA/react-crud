import './App.css';
//import {useState} from "react";
import {LoginButton, LogoutButton, Profile, ImgUpload} from './components/auth0';
import {useAuth0} from "@auth0/auth0-react";
import Spinner from './components/Loading';
import { useState } from 'react';


function App() {
  const {isLoading, error, user, isAuthenticated} = useAuth0();
  const {userid, SetUserId} = useState('');
  if(isAuthenticated){
    SetUserId(user.sub)
  }
  console.log("Userid: " + userid)
  return (
    <>
    <div className="column">
    {error && <p>Authentication Error</p>}
    {!error && isLoading && <Spinner/>}
    {!error && !isLoading && (
      <>
        
        <Profile id={user.sub} isAuthenticated={isAuthenticated}/>
        <LoginButton/>
        <LogoutButton/>
      </>
    )}
    

    </div>
    </>
  )
}

export default App;

