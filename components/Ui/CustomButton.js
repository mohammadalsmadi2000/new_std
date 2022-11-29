import { Text, TouchableOpacity } from "react-native";

import { Colors } from "../../constant/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native'

function CustomButton({children,onPress,icon,color,colorIcon="#fff"}){

return (
  <TouchableOpacity
    style={{
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 30,
      flexDirection: "row",
      backgroundColor:Colors.gray700,
    }}
    onPress={onPress}
  >
    <FontAwesome name={icon} size={20} color={colorIcon} />
    <Text style={{ marginLeft: 10, color:colorIcon||"#fff", fontWeight: "bold" }}>
      {children}
    </Text>
  </TouchableOpacity>
);
}

export default CustomButton;