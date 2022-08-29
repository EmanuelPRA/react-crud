import './App.css';
//import {useState} from "react";
import {LoginButton, LogoutButton, Profile} from './components/auth0';
import {useAuth0} from "@auth0/auth0-react";
import Spinner from './components/Loading';
import { useState } from 'react';
import { PostForm } from './components/posting';
import {Feed} from './components/feed';

const profilebtn = require("/home/arlemar/Documents/reactcrum/client/src/img/profilebtn.svg");
const feedbtn = require("/home/arlemar/Documents/reactcrum/client/src/img/feedbtn.svg");
const postbtn = require("/home/arlemar/Documents/reactcrum/client/src/img/postbtn.svg");

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
    {!error && isLoading && <Spinner className="spinner"/>}
    {!error && !isLoading && (
      <>
        {page === 'profile' &&(
        <>
        <Profile id={userid} isAuthenticated={isAuthenticated} className='profile'/>
        <LoginButton className="btn"/>
        <LogoutButton className="btn"/>
        </>)}
        {page === 'post' &&(
        <>
        <PostForm id={userid} className='form-upload'/>
        </>)}

        {page === 'feed' &&(
        <>
        <Feed id={user.sub}/>
        </>)}
        
        
          {isAuthenticated &&(<div className='Navigation'>

<ul className='navigation'>
<li><img src={profilebtn} alt="Go to Profile" onClick={() => {setPage("profile")}}/></li>
<li><img src={postbtn} alt="Go to Post" onClick={() =>{setPage("post")}}/></li>
<li><img src={feedbtn} alt="Go to Feed" onClick={() =>{setPage("feed")}}/></li>
</ul>

</div>)}
      
      
      </>
    )}
    

    </div>
    </>
  )
}

export default App;

