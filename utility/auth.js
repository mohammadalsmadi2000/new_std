import axios from 'axios'

const API_KEY="AIzaSyDLhE--4uOaBz4zb0Z1EQ9cbaYC8oWnyvA";


async function auth(mode,email,password){
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken:true
        }
      );
      const token=response.data.localId;
      return token;
}

export  function createUser(email,password){
    return auth("signUp",email,password);
}
export  function signUser(email,password){
    return auth("signInWithPassword",email,password);
}