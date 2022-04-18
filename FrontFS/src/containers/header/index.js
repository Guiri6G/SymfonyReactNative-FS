import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Input } from "native-base";
import * as Font from "expo-font";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = (props) => {
  const navigation = useNavigation();

  const clearAsyncStorage = () => {
    AsyncStorage.clear();
    navigation.push("Login");
  };

  return (
    <View style={styles.container}>
      {props.noReturn ? null : (
        <View style={styles.icon}>
          <TouchableOpacity onPress={navigation.goBack}>
            <FontAwesome
              style={styles.contentIcon}
              name="chevron-left"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.iconR}>
        <TouchableOpacity onPress={(e) => clearAsyncStorage(e)}>
          <MaterialCommunityIcons
            style={styles.contentIcon}
            name="logout"
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.contentText}> BARBER SHOP </Text>
      <Fontisto
        style={styles.contentIcon}
        name="scissors"
        size={60}
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffa502",
    height: 115,
    justifyContent: "space-around",
    alignItems: "center",
  },
  contentText: {
    paddingTop: 70,
    fontSize: 30,
    fontFamily: "Shrikhand-Regular",
  },
  contentIcon: {
    paddingBottom: 40,
  },
  icon: {
    position: "absolute",
    left: 12,
    top: 48,
  },
  iconR: {
    position: "absolute",
    right: 12,
    top: 52,
  },
});

export default Header;
