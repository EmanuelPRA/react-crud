export const PostForm = (props) =>{


    return(
        <>
        <div className="post-wrapper">
            <form method="POST" action={'http://localhost:3001/postinsert'} encType='multipart/form-data'>
                <textarea name="body" placeholder="Description..."/>
                <input className="file-input" type="file" name="file" required></input>
                <input type="hidden" name="id" value={props.id}></input>
                <input type="submit" value="upload"></input>
                
            </form>
        </div>
        </>
    )


}

