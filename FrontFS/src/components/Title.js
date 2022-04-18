import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ content, size }) => {
  const { container, title, small, medium } = styles;
  const getTitleStyle = () => {
    switch (size) {
      case "big":
        return title;
      case "small":
        return small;
      case "medium":
        return medium;
    }
  };
  return (
    <View style={container}>
      <Text style={getTitleStyle()}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Shrikhand-Regular",
  },
  small: {
    color: "#7f8fa6",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    paddingTop: 0,
  },
  medium: {
    fontFamily: "Poppins",
    fontSize: 32,
    lineHeight: 60,
  },
});
export default Title;
