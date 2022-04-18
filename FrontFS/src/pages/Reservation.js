import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BarberSlotPicker from "../containers/barberSlotPicker";

const Reservation = (props) => {
  useEffect(() => {
    // console.log("prop3333s", props.route.params.id);
  }, []);

  const [state, setState] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.textDc}>Effectue ta réservation </Text>
      <BarberSlotPicker props={props} />
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

export default Reservation;
