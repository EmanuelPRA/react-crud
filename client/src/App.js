import './App.css';
//import {useState} from "react";
import {LoginButton, LogoutButton, Profile} from './components/auth0';
import {useAuth0} from "@auth0/auth0-react";
import Spinner from './components/Loading';
import { useState } from 'react';
import { PostForm } from './components/posting';


function App() {
  const {isLoading, error} = useAuth0();
  const {user, isAuthenticated} = useAuth0();
  if(isAuthenticated){
    var userid = user.sub
  }
  console.log("Userid: " + userid)
  return (
    <>
    <div className="column">
    {error && <p>Authentication Error</p>}
    {!error && isLoading && <Spinner/>}
    {!error && !isLoading && (
      <>
        
        <Profile id={userid} isAuthenticated={isAuthenticated}/>
        <LoginButton/>
        <LogoutButton/>

      <div className='Navigation'>

      <ul>
      <li>Profile</li>
      <li>Post</li>
      <li>Feed</li>
      </ul>

      </div>
      <PostForm id={userid}/>
      </>
    )}
    

    </div>
    </>
  )
}

export default App;

