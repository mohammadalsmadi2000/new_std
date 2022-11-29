import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";

import CustomButton from "../components/Ui/CustomButton";
import {LESSONS} from '../data/lessonsData';
import { lessonsContext } from "../Store/lessonsContext";
import { useIsFocused } from '@react-navigation/native';

function LessonsScreen ({navigation}){

  const isFocused = useIsFocused();
  const [valueI, setValueI] = useState("");
  const [valueS, setValueS] = useState("");
  const authCtx=useContext(lessonsContext);
  const token= authCtx.token;

  function onPressHandle(){
    navigation.navigate('Code')
  }
    function renderItem(item){
        console.log(item.item.title)
        
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Detail", {
                title: item.item.title,
                //meal: MEALS,
              });
            }}
            style={{
              flex: 1,
              margin: 16,
              height: 150,
              elevation: 4,
              borderRadius: 8,
              shadowColor: "black",
              shadowOffset: { height: 0, width: 2 },
              shadowOpacity: 0.26,
              shadowRadius: 5,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: item.item.color,
            }}
          >
            <Text style={{color:'#fff'}} >{item.item.title}</Text>
          </TouchableOpacity>
        );
    }
    
return (
  <View style={{ flex: 1 }}>
    <View style={styles.buttonAdd}>
      <CustomButton icon="plus" onPress={onPressHandle}>
        Add Lessons
      </CustomButton>
    </View>
    {LESSONS.length === 0 && (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text >Unfortunately, you have not added</Text>
        <Text>any subjects to this moment 😔...</Text>
      </View>
    )}
    {isFocused && (
      <FlatList
        style={{ flex: 1 }}
        numColumns={2}
        data={LESSONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    )}
  </View>
);
}

export default LessonsScreen;

const styles=StyleSheet.create({
    container:{flex:1,justifyContent:'center',alignItems:'center'},
    buttonAdd:{
      width:'100%',
      borderRadius:8,
     // elevation:5,
      justifyContent:'center',
      alignItems:'center',
      marginVertical:6
    }
})