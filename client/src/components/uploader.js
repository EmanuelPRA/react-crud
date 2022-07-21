import { useState } from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";

const location = require("/home/arlemar/Documents/reactcrum/client/images");

const Uploader =() => {
    return(<Uploady destination={{ url: 'http://localhost:3000/'}}>

        <UploadButton>Upload File</UploadButton>

    </Uploady>)
};

export default Uploader