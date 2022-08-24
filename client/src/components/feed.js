import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{
    let posts = [{}]

    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{


        const object = Object.values(JSON.parse(JSON.stringify(res)))
          
         posts = object[0]
         if(posts.length > 1){
          posts.map((anObjectMapped, index) => {
            
            return (
                <p key={index}>
                    {anObjectMapped}
                </p>
            );
            }
          )}
        
    });
    
    }