import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constant/Colors";

function Header({title}){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.primary800,
    paddingTop: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 22,
    color:"#fff"
  },
});

export default Header;