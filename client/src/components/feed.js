import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{
    let posts = [[]]

    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{


        const object = Object.values(JSON.parse(JSON.stringify(res)))
        console.log(object[0])
        object[0].forEach((element, index) => {
          
          posts.push([element['posterid'], element['post_text'],element['post_image']])
        });
    });
    posts.forEach((element) =>{
      element.forEach((e) =>{
        console.log(e)
      })
    })
    
    return(
    <>
    <h1>Feed</h1>
        <div className="post">
          <h1>{"text: "}</h1>
          </div>

    </>
    )

}