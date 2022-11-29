import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constant/Colors";
import CustomButton from "./CustomButton";
import {useNavigation}  from '@react-navigation/native'

function FormLessons({title}){
    const navigation=useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.attendance}>
          <View style={{ flexDirection: "row",justifyContent:'space-around' }}>
            <View>
              <View style={styles.titleAttendance}>
                <Text style={{ fontSize: 18, color: "#fff" }}>Attendance</Text>
              </View>
              <View style={styles.numAttendance}>
                <Text style={{ fontSize: 38, color: "#fff" }}>17</Text>
              </View>
            </View>
            <View>
              <View style={styles.titleAttendance}>
                 
                <Text style={{ fontSize: 18, color: "#fff" }}>Absence</Text>
              </View>
              <View style={styles.numAttendance}>
                <Text style={{ fontSize: 38, color: "#fff" }}>8</Text>
              </View>
            </View>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',marginBottom:4}}>

          <CustomButton icon="qrcode" colorIcon="#fff" color="#fff" onPress={()=>{navigation.navigate("Qr")}} >Attendance management</CustomButton>
          </View>
        </View>
      </View>
    );
}

export default FormLessons;

const styles = StyleSheet.create({
  numAttendance: {margin:16,alignItems:"center"},
  titleAttendance: {},
  attendance: { margin: 6 },
  line: {alignItems:"center",marginLeft:10, width: "95%", height: 1, backgroundColor: "#d3d3d3" },
  titleContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: 90,
  },
  title: { fontSize: 30, color: "white" },
  container: {
    margin: 16,
    elevation: 4,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    overflow: "hidden",
    flex: 1,
    //alignItems: "center",
    height: 290,
    backgroundColor: Colors.primary800,
  },
});