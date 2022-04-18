import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
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
//   url: `http://172.20.10.2:8000/api/barber`,
// };

const CardBarber = (props) => {
  const idSal = props.props.route.params.id;

  console.log(idSal, "oooo");

  const [isLoaded, setIsLoaded] = useState(false);

  const [Barber, setBarber] = useState([]);

  const options = {
    method: "GET",
    url: `http://192.168.1.74:8000/api/barberS/${idSal}`,
  };

  const getSalon = () => {
    axios
      .request(options)
      .then((response) => {
        setIsLoaded(true);
        setBarber(response.data);
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
        data={Barber}
        renderItem={(item) => (
          <View>
            <VStack space="2.5" mt="4" px="8">
              <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                <TouchableOpacity
                  onPress={() =>
                    props.props.navigation.push("Reservation", {
                      id: item.item.id,
                    })
                  }
                >
                  <ImagedCarouselCard
                    id={item.item.id}
                    width={300}
                    height={300}
                    shadowColor="#051934"
                    text={`${item.item.nom} ${item.item.prenom}`}
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

export default CardBarber;
