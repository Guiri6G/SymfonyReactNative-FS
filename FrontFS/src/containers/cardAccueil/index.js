import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import {
  VStack,
  Stack,
  Center,
  Spinner,
  NativeBaseProvider,
  HStack,
  Heading,
} from "native-base";
import ImagedCarouselCard from "react-native-imaged-carousel-card";

// const options = {
//   method: "GET",
//   url: `http://172.20.10.2:8000/api/salon`,
// };

const options = {
  method: "GET",
  url: `http://192.168.1.74:8000/api/salon`,
};

const CardAccueil = (props) => {
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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={Salon?.slice(0, 3)}
        renderItem={(item) => (
          <View>
            <VStack space="2.5" mt="4" px="8">
              <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                <TouchableOpacity
                  onPress={() =>
                    props.props.navigation.push("Barber", {
                      id: item.item.id,
                    })
                  }
                >
                  <ImagedCarouselCard
                    id={item.item.id}
                    width={300}
                    height={300}
                    shadowColor="#051934"
                    text={`${item.item.nom} - ${item.item.localisation}`}
                    source={{ uri: item.item.imageURL }}
                  />
                </TouchableOpacity>
              </Stack>
            </VStack>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {},
});

export default CardAccueil;
