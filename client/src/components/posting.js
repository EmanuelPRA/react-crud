import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";


const PostForm = (props) =>{

    const [postBody, setPostBody] = useState("")

    return(
        <>
            <form>
                <input type="text" onChange={(event) => setPostBody(event.target.value)}/>
                <Uploady>
                    <UploadButton/>
                    
                </Uploady>
                <input type="Submit" value="post"></input>
            </form>
        </>
    )


}

