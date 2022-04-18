import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  VStack,
  Stack,
  Center,
  Spinner,
  NativeBaseProvider,
  HStack,
  Heading,
  Button,
} from "native-base";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const baseUrl = "http://172.20.10.2:8000";

const BarberSlotPicker = ({ props }) => {
  const idBar = props.route.params.id;

  // const [BarberId, setBarberId] = useState([]);

  const [idSalon, setIdSalon] = useState("");
  const [idBarber, setIdBarber] = useState("");
  const [idUser, setIdUser] = useState("");
  const [DebutRDV, setDebutRDV] = useState("");
  const [FinRDV, setFinRDV] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [Barber, setBarber] = useState([]); // stocker resultat/objet axios
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [DateTimeP, setDateTimeP] = useState("");

  const options = {
    method: "GET",
    url: `http://192.168.1.74:8000/api/barber/${idBar}`,
  };

  // const options = {
  //   method: "GET",
  //   url: `http://172.20.10.2:8000/api/barber/${idBar}`,
  // };

  const getSalon = () => {
    axios
      .request(options)
      .then((response) => {
        setIsLoaded(true);
        setBarber(response.data);
        setIdBarber(response.data.id);
        setIdSalon(response.data.idSalon.id);
        setIdUser(1);
        console.log(response.data.idSalon.id, "aoyooooo");
      })
      .catch((err) => {
        console.error("erreur", err);
        setIsLoaded(true);
      });
  };
  useEffect(() => {
    getSalon();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTimeP(date);
    setDebutRDV(Number(date.getTime()).toString().concat("000000"));
    setFinRDV(
      Number(date.getTime() + 3600)
        .toString()
        .concat("000000")
    );
    hideDatePicker();
  };

  const currentT = DateTimeP.toLocaleString();

  const onSubmitFormHandler = async (event) => {
    console.log(DebutRDV, FinRDV, baseUrl, idBarber);
    if (DebutRDV == "" || FinRDV == "") {
      alert("Veuillez choisir une date de rendez-vous");
      return;
    }
    axios({
      method: "POST",
      url: `http://192.168.1.74:8000/api/slots`,
      data: {
        idSalon: idSalon,
        idBarber: idBarber,
        idUser: "1",
        DebutRDV: DebutRDV,
        FinRDV: FinRDV,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Reservation effectué");
      })
      .catch((error) => {
        alert("Erreur");

        console.error("erreur", error.response.data);
      });
  };

  console.log(DebutRDV, "yaaaaa", FinRDV);
  if (!isLoaded) {
    return (
      <NativeBaseProvider>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </NativeBaseProvider>
    );
  } else {
    return (
      <View>
        <VStack space="2.5" mt="4" px="8">
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <ImagedCarouselCard
              width={250}
              height={250}
              shadowColor="#051934"
              text={`${Barber.nom} ${Barber.prenom}`}
              source={{ uri: Barber.imageURL }}
            />
          </Stack>
        </VStack>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          local="fr_FR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {DateTimeP == "" ? (
          <Text></Text>
        ) : (
          <Text style={styles.textVp}>
            RDV le : {currentT} {"\n"}Durée : 1H
          </Text>
        )}
        <Button onPress={showDatePicker} colorScheme="blue">
          CHOISIR DATE
        </Button>
        <Text></Text>
        <Button colorScheme="secondary" onPress={(e) => onSubmitFormHandler(e)}>
          VALIDER
        </Button>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textVp: {
    fontFamily: "Montserrat-SemiBold",
    color: "#000000",
    fontSize: 15,
    marginTop: 15,
  },
});

export default BarberSlotPicker;
