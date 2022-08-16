export const PostForm = (props) =>{


    return(
        <>
            <form method="POST" action={'http://localhost:3001/postinsert'} encType='multipart/form-data'>
                <textarea name="body" >Enter text here...</textarea>
                <input type="file" name="file" required></input>
                <input type="hidden" name="id" value={props.id}></input>
                <input type="submit" value="upload"></input>
                
            </form>
        </>
    )


}

