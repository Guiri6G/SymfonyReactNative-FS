import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CardSalon from "../containers/cardSalon";

const Salon = (props) => {
  useEffect(() => {
    console.log("prop2222s", props.route.params.id);
  }, []);

  const [state, setState] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.textDc}>Tes salons © </Text>
      <CardSalon props={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  textDc: {
    fontSize: 20,
    fontFamily: "Shrikhand-Regular",
    paddingBottom: 5,
  },
});

export default Salon;
