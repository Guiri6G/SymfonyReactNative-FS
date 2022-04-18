import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCs-rv4gUA5UJ6aHUURsgopC8BhN2Q11AA"); // use a valid API key

const Geo = () => {
  const [ville, setVille] = useState("");
  const [locationG, setLocationG] = useState("");

  const onSubmitForm = async (event) => {
    console.log("coucou");
    console.log(ville);
    Geocoder.from(ville)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log("lat : ", location.lat);
        console.log("lng : ", location.lng);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <View style={styles.container}>
      <Text>yoooo</Text>
      <TextInput
        style={styles.input}
        placeholder="text"
        value={ville}
        onChangeText={(ville) => setVille(ville)}
      />
      <Button
        onPress={(e) => onSubmitForm(e)}
        title="Ouvrir vers Maps"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 30,
  },
});
export default Geo;
