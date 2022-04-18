import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Logo from "../../assets/images/googleLogo.png";
import Title from "./Title";

const { width } = Dimensions.get("window");

const LoginBtn = ({ onPress }) => {
  const { logo, container } = styles;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={container}>
        <Title size="small" content="Google connexion" />
        <Image style={logo} source={Logo} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width - 80,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },
  logo: {
    width: 45,
    height: 45,
  },
});
export default LoginBtn;
