import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{
    let posts = [[]]

    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{


        const object = Object.values(JSON.parse(JSON.stringify(res)))
        console.log(object[0][0])
        object[0].forEach(element => {
          posts.push(element)
        });
    });
    
    console.log(posts["posterid"])
    return(
    <>
    <h1>Feed</h1>
        <div className="post">
          <h1>{"text: "+posts}</h1>
          </div>

    </>
    )

}