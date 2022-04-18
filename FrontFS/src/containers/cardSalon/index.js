import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Button,
  Linking,
} from "react-native";
import {
  VStack,
  Stack,
  Spinner,
  HStack,
  Center,
  Heading,
  NativeBaseProvider,
} from "native-base";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { getLocationFromCity } from "../../utils/helpers";
import Geocoder from "react-native-geocoding";
import createMapLink from "react-native-open-maps";

Geocoder.init("AIzaSyCs-rv4gUA5UJ6aHUURsgopC8BhN2Q11AA"); // API key

// const options = {
//   method: "GET",
//   url: `http://172.20.10.2:8000/api/salon`,
// };

const options = {
  method: "GET",
  url: `http://192.168.1.74:8000/api/salon`,
};

const CardItem = ({ item, props }) => {
  const [localisation, setLocalisation] = useState({});
  useEffect(() => {
    const getLoc = async () => {
      const loc = await getLocationFromCity(item.item.localisation);
      setLocalisation(loc);
    };
    getLoc();
  }, []);

  const GoToMaps = () => {
    // Version Apple/Google sans itineraire
    createMapLink({
      provider: "apple",
      latitude: localisation.lat,
      longitude: localisation.lng,
      travelType: "walk",
    });
  };

  const GoTo = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${localisation.lat},${localisation.lng}&dir_action=navigate&travelmode=driving`
    );
  };

  return (
    <View>
      <VStack space="2.5" mt="0" px="2">
        <Stack direction="row" mb="3" mt="1.5" space={3}>
          <TouchableOpacity
            onPress={() =>
              props.props.navigation.push("Barber", {
                id: item.item.id,
              })
            }
          >
            <ImagedCarouselCard
              id={item.item.id}
              width={180}
              height={180}
              shadowColor="#051934"
              text={`${item.item.nom} - ${item.item.localisation}`}
              source={{ uri: item.item.imageURL }}
            />
          </TouchableOpacity>
        </Stack>
      </VStack>
      <View style={styles.viewButton}>
        <Button
          title="Itinéraire"
          color="#841584"
          value={getLocationFromCity(item.item.localisation)}
          onPress={(e) => GoTo(e)}
        />
        <Text>-</Text>
        <Button
          title="Cartes"
          color="#841584"
          value={getLocationFromCity(item.item.localisation)}
          onPress={(e) => GoToMaps(e)}
        />
      </View>
    </View>
  );
};

const CardSalon = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [Salon, setSalon] = useState([]);

  const getSalon = () => {
    axios
      .request(options)
      .then((response) => {
        setIsLoaded(true);
        setSalon(response.data);
      })
      .catch((err) => {
        console.error("erreur", err);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    getSalon();
  }, []);

  if (!isLoaded) {
    return (
      <NativeBaseProvider>
        <HStack space={2} justifyContent="center">
          <Spinner color="warning.500" accessibilityLabel="Loading posts" />
          <Heading color="warning.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </NativeBaseProvider>
    );
  } else {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        data={Salon}
        renderItem={(item) => {
          return <CardItem item={item} props={props}></CardItem>;
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};

const styles = StyleSheet.create({
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardSalon;
