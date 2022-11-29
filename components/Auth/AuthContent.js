import { Alert, StyleSheet, Text, View } from 'react-native';
import { useContext, useState } from 'react';

import AuthForm from './AuthForm';
import { Colors } from '../../constant/Colors';
import FlatButton from '../Ui/FlatButton';
import { TouchableOpacity } from 'react-native-web';
import { lessonsContext } from '../../Store/lessonsContext';
import { post } from '../../utility/http';
import {useNavigation} from '@react-navigation/native'

function AuthContent({ isLogin, onAuthenticate }) {
  const infoCtx=useContext(lessonsContext);
  const [fullName,setFullName]=useState();

const navigation=useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    //isLogin?navigation.replace('Login'):navigation.replace('Signup');
  if(!isLogin){
    navigation.replace('LogIn');
  }else{
    navigation.replace("Signup");
  }
  }

  function submitHandler(credentials,info) {
    let { email, confirmEmail, password, confirmPassword } = credentials;
   let{name,id}=info
   // let fullNamePlus=firstName+midName+lastName;
    
    email = email.trim();
    password = password.trim();
    
    
    //id = id.trim();

    

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    //const idValid=id.length ==10&&id.includes('20')&&id.match(/^[0-9]+$/) != null;
    

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    
    !isLogin
      ? onAuthenticate({ email, password, name, id })
      : onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
        
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 34,
    marginBottom: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
   
  },
  buttons: {
    marginTop: 8,
  },
});
