import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner, HStack, Heading, NativeBaseProvider } from "native-base";
import Header from "./src/containers/header";
import Accueil from "./src/pages/Accueil";
import Login from "./src/pages/Login";
import Barber from "./src/pages/Barber";
import Salon from "./src/pages/Salon";
import Reservation from "./src/pages/Reservation";
import Geo from "./src/pages/Geo";
import { renderInitialScreen } from "./src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialScreen, setInitialScreen] = useState("Login");
  const loadFont = async () => {
    try {
      await Font.loadAsync({
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "Shrikhand-Regular": require("./assets/fonts/Shrikhand-Regular.ttf"),
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
      });
      const screen = await renderInitialScreen();
      if (screen) {
        setInitialScreen(screen);
      }

      setLoading(false);
    } catch (error) {
      console.error("erreur", error);
    }
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName={initialScreen}
          screenOptions={{
            header: () => <Header />,
            headerLeft: () => <Fontisto name="home" />,
          }}
        >
          <Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Accueil"
            component={Accueil}
            options={{
              header: () => <Header noReturn />,
            }}
          />
          <Screen name="Barber" component={Barber} />
          <Screen name="Geo" component={Geo} />
          <Screen name="Salon" component={Salon} />
          <Screen name="Reservation" component={Reservation} />
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
