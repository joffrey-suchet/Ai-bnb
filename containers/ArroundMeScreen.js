import { Text, View, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const ArroundMeScreen = () => {
  const [data, setData] = useState();
  const [latitude, setLatitude] = useState();
  const { longitude, setLongitude } = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const askPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      showsUserLocation={true}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude ? latitude : 48.866667,
        longitude: longitude ? longitude : 2.333333,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {data.map((flat, index) => {
        return (
          <MapView.Marker
            key={flat._id}
            coordinate={{
              latitude: flat.location[1],
              longitude: flat.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

export default ArroundMeScreen;
