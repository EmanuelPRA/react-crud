import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";


export const PostForm = (props) =>{

    const [postBody, setPostBody] = useState("")



    return(
        <>
            <form>
                <input type="text" onChange={(event) => setPostBody(event.target.value)}/>
                <Uploady destination={{ url: "http://localhost:3001/postinsert?id=" + props.id + "?body=" + postBody}}>
                    <UploadButton onClick={ev => {ev.preventDefault()}}/>
                    
                </Uploady>
            </form>
        </>
    )


}

