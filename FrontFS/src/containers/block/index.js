import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");
console.log("width ", width);

const Block = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: (width * 4) / 3,
    backgroundColor: "#ffa502",
    flexGrow: 3,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Block;
