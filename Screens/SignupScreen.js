import { useContext, useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { createUser } from '../utility/auth';
import { lessonsContext } from '../Store/lessonsContext';
import { post } from '../utility/http';

//import { authContext } from '../store/auth-context';


function SignupScreen({navigation}) {

  const authCtx=useContext(lessonsContext)
  const[loading,setLoading]=useState(false);
  const [tempId,setTempId]=useState("");


  async function newUSer({
    email,
    password,
    name,
    id,
  }) {
    setLoading(true);
    setTempId(id)
    try {
      const token = await createUser(email, password);
      console.log("tttttt"+token);
      authCtx.authenticate(token,name,id);
      token?updateDB(name,id,token):null;
      setLoading(false);
    } catch (err) {
      alert("WRONG" + err);
      setLoading(false);
    }
 
  }
  
    async function updateDB(user,id,uid) {
      console.log("Start");
      const response = await post({
        ["student name"]: user,
        id: id,
        uid:uid
      });
       authCtx.addStudentName(user);
       authCtx.addID(id)
      navigation.navigate('Lessons')
    }

  
  if(loading){
    return<LoadingOverlay message={"Create New User..."} />
  }

  return (
      
      <AuthContent onAuthenticate={newUSer} />
    
  );
}

export default SignupScreen;
