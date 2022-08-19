export const PostForm = (props) =>{
    const divStyle = {
        display: 'none',
      };

    return(
        <>

        
        <div className="post-wrapper">
            <form method="POST" action={'http://localhost:3001/postinsert'} encType='multipart/form-data'>
            <h1>ADD A POST</h1>
                <textarea name="body" placeholder="Description..."/>
                <input className="file-input" type="file" name="file" id="file" required style={divStyle} accept=".jpg,.png,.svg,.webp"></input>
                <label for="file">File Upload</label>
                <input type="hidden" name="id" value={props.id}></input>
                <hr/>
                <input type="submit" value="upload"></input>
                
            </form>
        </div>
        </>
    )


}

