import { StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import { AddItem } from "../data/lessonsData";
import CustomButton from "../components/Ui/CustomButton";
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { get } from "../utility/http";

function CodeScreen ({navigation}){
    const [codeFromDB,setCodeFromDB]=useState();
    const [codeFromDB2,setCodeFromDB2]=useState();
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
      async function helperGet() {
        console.log("start");
        let tempArray = [];
        const response = await get(
          "https://lessons-aa759-default-rtdb.firebaseio.com/code.json"
        );
        //console.log("zzz"+response);
        for (const key in response) {
          console.log(key);
          tempArray.push(response[key]);
        }   
        setCodeFromDB(tempArray);
      }

      helperGet();
    },[navigation])

    async function mapOfSubject(){
      setLoading(true);
      console.log("start");
        let tempArray = [];
        const response = await get(
          "https://lessons-aa759-default-rtdb.firebaseio.com/code.json"
        );
        //console.log("zzz"+response);
        for (const key in response) {
          console.log(key);
          tempArray.push( { [key]:response[key]});
        }   
        setCodeFromDB(tempArray);
        setLoading(false);
    }
    if(loading){
      return<LoadingOverlay message={"Check Code..."} />
    }
    
    const [textInputValue, setTextInputValue] = useState("");
    function onPressHandle(){


       
        if (codeFromDB.includes(textInputValue)) {
          
          AddItem('c9',"CPE250");
          navigation.navigate("Lessons");
        } else {
           alert("wrong password");
          setTextInputValue("");
        }
    }
    console.log(textInputValue);
return (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text>Code Lesson</Text>
    </View>
    <View style={styles.textInputContainer}>
      <TextInput
      autoCapitalize="none"
        style={styles.textInput}
        placeholder="Code"
        value={textInputValue}
        onChangeText={(value)=>setTextInputValue(value)}
      />
      <View style={styles.buttonContainer} >
      <CustomButton icon="check" onPress={onPressHandle}>confirm</CustomButton>

      </View>
    </View>
  </View>
);
}

export default CodeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },
  textInput: {
    width: "80%",
    borderRadius: 8,
    textAlign: "center",
    width: "100%",
    height: 60,
    borderBottomColor: "black",
    borderWidth: 1,
  },buttonContainer:{
    marginTop:8
  }
});