import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
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

export default LoginButton