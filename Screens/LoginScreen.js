import { useContext, useState } from 'react';

import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { lessonsContext } from '../Store/lessonsContext';
import { signUser } from '../utility/auth';

//import { authContext } from '../store/auth-context';


function LoginScreen({navigation}) {
  const authCtx=useContext(lessonsContext);

  const[loading,setLoading]=useState(false);

  async function signUserHelper({email,password}){
    setLoading(true);
    try {
      const token=await signUser(email, password);
      authCtx.authenticate(token)
      navigation.navigate("Lessons")
     // authCtx.authenticate(token)
    
    } catch (error) {
     Alert.alert("Authentication failed","Please try again later !")
     setLoading(false);
    }
  
  }
  if(loading){
    return<LoadingOverlay message={"Sign User..."} />
  }
  return <AuthContent isLogin onAuthenticate={signUserHelper} />;
}

export default LoginScreen;
