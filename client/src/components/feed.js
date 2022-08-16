import Axios from 'axios';
import React, {useState} from 'react';

export const Feed = () =>{
    let objects = []

    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{


        const object = Object.values(JSON.parse(JSON.stringify(res)))
        console.log(object)
        if(object.length !== 0){
        objects = object
        }
    });
    console.log(objects)
    return(
    <>
    <h1>Feed</h1>
        <div className="post">
          <h1>Text: {objects[0][0]}</h1>
          </div>

    </>
    )

}