import './App.css';
//import {useState} from "react";
import {LoginButton, LogoutButton, Profile} from './components/auth0';
import {useAuth0} from "@auth0/auth0-react";
import Spinner from './components/Loading';
import { useState } from 'react';
import { PostForm } from './components/posting';
import {Feed} from './components/feed';


function App() {
  const {isLoading, error} = useAuth0();
  const {user, isAuthenticated} = useAuth0();
  const [page, setPage] = useState("profile");


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
        {page === 'profile' &&(
        <>
        <Profile id={userid} isAuthenticated={isAuthenticated}/>
        <LoginButton/>
        <LogoutButton/>
        </>)}
        {page === 'post' &&(
        <>
        <PostForm id={userid}/>
        </>)}

        {page === 'feed' &&(
        <>
        <Feed/>
        </>)}
        
        

      <div className='Navigation'>

      <ul>
      <li><button onClick={() => {setPage("profile")}}>Profile</button></li>
      <li><button onClick={() =>{setPage("post")}}>Post</button></li>
      <li><button onClick={() =>{setPage("feed")}}>Feed</button></li>
      </ul>

      </div>
      
      </>
    )}
    

    </div>
    </>
  )
}

export default App;

