import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{

  const [post, setPost] = React.useState(null);

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
          <div key={id} className="post">
            <img alt={"post #"+ id} src={require('/home/arlemar/Documents/reactcrum/client/src/img/' + post_image)}/>
            <p>{post_text}</p>
            <p>Posted By:{posterid}</p>
            <p>Posted On:{post_time}</p>
          </div>
        );
      })}

    </div>
  );
    
}