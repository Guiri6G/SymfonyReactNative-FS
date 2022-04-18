import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Title from "../components/Title";
import Block from "../containers/block";
import { Fontisto } from "@expo/vector-icons";
import LoginBtn from "../components/LoginBtn";
import { auth } from "../utils/helpers";

const { width } = Dimensions.get("window");

const Login = (props) => {
  const { container, container_2, titleContainer } = styles;
  const handleLogin = () => {
    auth(props.navigation);
  };
  return (
    <View style={container}>
      <Block>
        <Fontisto name="scissors" size={60} color="white" />
        <Title content="BARBER SHOP" size="big" />
      </Block>
      <View style={container_2}>
        <View style={titleContainer}>
          <Title content="Google connexion" size="medium" />
        </View>
        <LoginBtn onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container_2: {
    flexGrow: 1,
    width: width,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleContainer: {
    width: width - 80,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
export default Login;
