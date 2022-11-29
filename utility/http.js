import axios from "axios";

const DB_URL="https://lessons-aa759-default-rtdb.firebaseio.com/";

export async function get(url){
  const response = await axios.get("https://lessons-aa759-default-rtdb.firebaseio.com/code.json");

 // console.log(response.data);
  return response.data;
}
  export async function add(data){
    const response = await axios.post(`${DB_URL}student.json`,data);
  
   
    
    //const responseData = response.data;
  //console.log(response);
    return response.data;
  }
  //const data = { username: 'example' };

  export  async function post(data){
    fetch(`https://lessons-aa759-default-rtdb.firebaseio.com/students.json`, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

   } 


