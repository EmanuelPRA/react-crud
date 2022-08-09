import {useAuth0} from '@auth0/auth0-react';
import React, { useState } from 'react';
import Axios from 'axios';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";


const PostForm = (props) =>{

    return(
        <>
            <form>
                <input type="text"/>
                <Uploady>
                    <UploadButton/>
                    
                </Uploady>

            </form>
        </>
    )


}

