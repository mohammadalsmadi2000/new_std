import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constant/Colors";
import CustomButton from "./CustomButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Tooltip from 'react-native-walkthrough-tooltip';
import {useNavigation}  from '@react-navigation/native'
import { useState } from "react";

function FormExcuse({title}){
    const navigation=useNavigation();
    const [toolTipVisible,setToolTipVisible]=useState(false);
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{title}</Text>
            <Tooltip
              isVisible={toolTipVisible}
              content={
                <Text>
                  In the event of your absence, you can provide an excuse for
                  the day you were absent from by submitting an official excuse
                  within 48 hours from the time of the lecture and waiting for a
                  response.
                </Text>
              }
              placement="top"
              onClose={() => setToolTipVisible(false)}
            >
              <Pressable
                onPress={() => {
                  setToolTipVisible(true);
                }}
              >
                <FontAwesome name="info-circle" size={20} color="#fff" />
              </Pressable>
            </Tooltip>
          </View>
        </View>
        <View style={styles.attendance}></View>
        <View style={styles.line}></View>
        <View style={{ alignItems: "center", marginTop: 6 }}>
          <View style={{ justifyContent: "center", height: 50 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>Status : </Text>
              <Text style={{ color: "#fff" }}> in Progress... 📝 </Text>
            </View>
          </View>
          <View style={{justifyContent:'center',height:70}}>

          <CustomButton
            icon="upload"
            colorIcon="#fff"
            color="#fff"
            onPress={() => {
              navigation.navigate("Qr");
            }}
          >
            Upload Photo
          </CustomButton>
          </View>
        </View>
      </View>
    );
}

export default FormExcuse;

const styles = StyleSheet.create({
  numAttendance: {margin:16,alignItems:"center"},
  titleAttendance: {},
  attendance: { marginBottom: 6,alignItems:'flex-end' },
  line: {marginLeft:6,marginTop:6,alignItems:"center", width: "94%", height: 1, backgroundColor: "#d3d3d3" },
  titleContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: 50,
  },
  title: { fontSize: 30, color: "white" },
  container: {
    margin: 16,
    marginBottom:2,
    elevation: 4,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    overflow: "hidden",
    flex: 1,
    //alignItems: "center",
    height: 190,
    backgroundColor: Colors.primary800,
  },
});