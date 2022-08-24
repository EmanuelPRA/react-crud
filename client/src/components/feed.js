import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{
    let posts = [{}]

    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{


        const object = Object.values(JSON.parse(JSON.stringify(res)))
        console.log(object[0])
          
         posts = object[0]
         console.log(posts)
        
    });
    
    if(posts.length > 1){
    console.log(posts)
    posts.map((anObjectMapped, index) => {
      return (
          <p key={`${anObjectMapped.postText}_{anObjectMapped.email}`}>
              {anObjectMapped.post_time} - {anObjectMapped.posterid}
          </p>
      );
      }
    )}}