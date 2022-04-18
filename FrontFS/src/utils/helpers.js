import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Google from "expo-google-app-auth";
import axios from "axios";

import Geocoder from "react-native-geocoding";
Geocoder.init("AIzaSyCs-rv4gUA5UJ6aHUURsgopC8BhN2Q11AA"); // API key

const config = {
  iosClientId: `850553231679-6gduft5okio6ik84gsturvqalq0aeqh6.apps.googleusercontent.com`,
  iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
};

export const auth = async (navigation) => {
  try {
    const { user, type } = await Google.logInAsync(config);
    if (type === "success") {
      const { name, email } = user;
      const y = await axios({
        method: "GET",
        url: `http://192.168.1.74:8000/api/user/${name}`,
      });
      const x = await axios({
        method: "POST",
        url: `http://192.168.1.74:8000/api/user`,
        data: {
          Username: user.name,
          mdpUser: "mdddp",
          roleUser: ["ROLE_FOO"],
        },
      });
      const jsonValue = JSON.stringify(name);
      await AsyncStorage.setItem("@storage_Key", jsonValue)
        .then((res) => {
          console.log(res);
          navigation.push("Accueil");
          alert("Connexion effectué");
        })
        .catch((error) => {
          alert("Erreur");
          console.error("erreur", error.response.tokenData);
        });
    }
  } catch (e) {
    console.log("erreur auth ", e);
  }
};

export const renderInitialScreen = async () => {
  try {
    const value1 = await AsyncStorage.getItem("@storage_Key");
    JSON.parse(value1);
    return value1 ? "Accueil" : "Login";
  } catch (e) {
    console.error("error render initial screen"), e;
  }
};
// export const getLocation = () => {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       setState({ userCoords: position.coords });
//     },
//     () =>
//       alert(
//         "Vous n'avez pas autorisé l'accès a votre localisation, vous pouvez modifier ce parametre dans les réglages de votre téléphone."
//       )
//   );
// };

export const getLocationFromCity = async (city) => {
  return Geocoder.from(city)
    .then((json) => {
      var location = json.results[0].geometry.location;
      return location;
    })
    .catch((error) => console.warn(error));
};
