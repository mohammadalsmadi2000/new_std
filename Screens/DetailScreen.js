import { Button, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useLayoutEffect } from "react";

import CustomButton from "../components/Ui/CustomButton";
import FormExcuse from "../components/Ui/FormExcuse";
import FormLessons from "../components/Ui/FormLessons";
import { lessonsContext } from "../Store/lessonsContext";
import {useIsFocused} from '@react-navigation/native'

function DetailScreen ({navigation,route}){
    const isFocused = useIsFocused();
    const attCtx=useContext(lessonsContext);
   

    const title=route.params.title;
    useLayoutEffect(()=>{
        navigation.setOptions({
          title: title,
        });

    },[navigation])

    useEffect(()=>{
      console.log("Aaa"+attCtx.info);
    },[isFocused])
return (
  <View style={styles.container}>
    <View style={styles.formStyle}>
      <FormLessons title={title} />
    </View>
    <View style={styles.new}>
      <FormExcuse title="Make an excuse" />
    </View>
    <View style={styles.buttonContainer}>
      <View>
        <View style={styles.customButton}>
          
        </View>
      </View>
    </View>
  </View>
);
}

export default DetailScreen;

const styles=StyleSheet.create({
    container:{flex:1},
    formStyle:{height:300,width:'100%'},
    customButton:{
        width: "70%"
    },
    buttonContainer:{
        alignItems:'center'
    },new:{
      height:220,
      width:'100%'
    }
})