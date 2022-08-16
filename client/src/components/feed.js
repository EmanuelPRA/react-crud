import Axios from 'axios';

export const Feed = () =>{
    Axios.get('http://localhost:3001/feed', {
      }).then((res) =>{
        const object = Object.values(JSON.parse(JSON.stringify(res)))});


    return(<h1>Feed</h1>)

}