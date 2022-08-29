import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = (props) =>{
  const [formData, setFormData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/commentpost",{
      postid: formData[0],
      commentorid: formData[1],
      commentbody: formData[2]
    }
    ).then((response) => {
      console.log("comment posted")
    });
    document.getElementById("commentBody").reset();
}
  const [post, setPost] = useState(null);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/feed").then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (

    <div className='feed'>
      
      {post.map(({id, posterid, post_text, post_image, post_time}) => {
        return (
          <>
          <div key={id} className="post">
            <img alt={"post #"+ id} src={require('/home/arlemar/Documents/reactcrum/client/src/img/' + post_image)}/>
            <p>{post_text}</p>
            <p>Posted By:{posterid}</p>
            <p>Posted On:{post_time}</p>
          <form onSubmit={handleSubmit} id="form">
          <input id='commentBody' name='commentBody' required key={id + "commentbox"} type="text" placeholder='Comment' onChange={(e) => {setFormData([id, props.id, e.target.value])}}/>
          <input key={id + "commentbtn"}type="submit" value="Submit Comment"/> 


          </form>




          </div>
          </>
        );
      })}

    </div>
  );
    
}