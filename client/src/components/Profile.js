import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();
    return(
        
        

        isAuthenticated &&(
        <div>
            <article className="column">
                {user.picture && <img src={user.picture} alt={user?.name}/>}
                <h2>{user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}

                </ul>

            </article>

        </div>
    )
    
    
    
    
    
    )
}
export default Profile