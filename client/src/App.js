import './App.css';
import {useState} from "react";
import Axios from 'axios';
import {LoginButton, LogoutButton, Profile} from './components/auth0';
import {useAuth0} from "@auth0/auth0-react";
import Spinner from './components/Loading';


function App() {
  const {isLoading, error} = useAuth0();

  return (
    <>
    <div className="column">

    <h1>Login</h1>
    {error && <p>Authentication Error</p>}
    {!error && isLoading && <Spinner/>}
    {!error && !isLoading && (
      <>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
      </>
    )}
    

    </div>
    </>
  )
}

export default App;
