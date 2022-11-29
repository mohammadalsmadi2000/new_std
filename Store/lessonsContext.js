import { createContext, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const lessonsContext=createContext({
  token:"",
    isAuthenticated:false,
    studentName:"",
    time:"",
    lessons:"",
    id:"",
    authenticate:()=>{},
    logOut:()=>{},
    addStudentName:()=>{},
    addID:()=>{},
    addLessons:()=>{},
    addTime:()=>{}
  });
  
  function LessonsAttContextProvider({children}){
    const [studentName, setStudentName] = useState();
    const [lessons, setLessons] = useState();
    const [time, setTime] = useState();
    const [id, setID] = useState();
    const [authToken,setAuthToken]=useState();

  function addStudentName(name){
    return setStudentName(name);
  }
  function addLessons(lessons){
    return setLessons(lessons);
  }
  function addTime(time){
    return setTime(time);
  }
  function addID(i){
    return setID(i);
  }
  

  function authenticate(token,name,id,password,email){
      setAuthToken(token);
      setStudentName(name);
      setID(id);
      AsyncStorage.setItem('token',token);
      AsyncStorage.setItem('name',name);
      AsyncStorage.setItem('id',id);
      AsyncStorage.setItem('email',email);
      AsyncStorage.setItem('password',password);
  }
  function logOut(){
      setAuthToken(null);
      AsyncStorage.removeItem('token')
  }
 

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,

    studentName: studentName,
    lessons: lessons,
    time: time,
    id: id,
    authenticate: authenticate,
    logOut: logOut,
    addStudentName: addStudentName,
    addLessons: addLessons,
    addTime: addTime,
    addID: addID,
  };
  return (
    <lessonsContext.Provider value={value}>{children}</lessonsContext.Provider>
  );
}

export default LessonsAttContextProvider;