import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";


export const PostForm = (props) =>{

    const [postBody, setPostBody] = useState("")



    return(
        <>
            <form method="POST" action='http://localhost:3001/create' encType='multipart/form-data' onSubmit ={ev =>{ev.preventDefault()}}>
                <textarea name="body" >Enter text here...</textarea>
                <input type="file" name="file"></input>
                <input type="hidden" name="id" value={props.id}></input>
                <input type="submit" value="upload"></input>
                
            </form>
        </>
    )


}

