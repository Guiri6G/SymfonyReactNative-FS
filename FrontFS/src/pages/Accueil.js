import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import {
  Input,
  extendTheme,
  NativeBaseProvider,
  Icon,
  Divider,
  Center,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import CardAccueil from "../containers/cardAccueil";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Accueil = (props) => {
  const [state, setState] = useState("");

  const [UserInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem("@storage_Key");
      setUserInfo(data);
    };
    getUser();
  }, []);

  const goTo = () => {
    props.navigation.navigate("Salon", {
      id: "1",
    });
  };

  const theme = extendTheme({
    components: {
      Input: {
        baseStyle: {
          borderColor: "#eccc68",
          placeholder: "#ff4757",
          width: 275,
        },

        defaultProps: { size: "2xl" },
      },
      Divider: {
        baseStyle: {
          marginTop: 30,
          width: 300,
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.textDc}>
          Bonjour{" "}
          {Object.keys(UserInfo).length !== 0 ? JSON.parse(UserInfo) : "e"},
        </Text>
        <Input
          variant="rounded"
          InputRightElement={<Icon as={<Entypo name="magnifying-glass" />} />}
          placeholder="Chercher son salon"
          value={state}
          onChangeText={(value) => setState(value)}
        />
        <Text> {state}</Text>
        <Divider />
        <Text style={styles.textSl}> Votre selection de salon </Text>
        <CardAccueil props={props} />

        <TouchableOpacity onPress={goTo}>
          <Text style={styles.textVp}> Voir plus... </Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingTop: 30,
  },
  textDc: {
    fontSize: 15,
    fontFamily: "Shrikhand-Regular",
    paddingBottom: 5,
  },
  textSl: {
    fontFamily: "Shrikhand-Regular",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 15,
  },
  textVp: {
    fontFamily: "Montserrat-SemiBold",
    color: "#000000",
    fontSize: 10,
    paddingBottom: 150,
  },
});

export default Accueil;
