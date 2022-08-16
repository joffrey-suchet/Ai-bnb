import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";
import axios from "axios";
import MapView from "react-native-maps";

import { Entypo } from "@expo/vector-icons";

const RoomScreen = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // console.log(data.photos);
  // console.log(route.params.id);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}
        >
          <View style={[styles.card]}>
            <View style={[styles.pictureAndPrice]}>
              <Image
                source={{ uri: data.photos[0].url }}
                style={styles.image}
              />
              <Text style={[styles.price]}>{data.price} €</Text>
            </View>
            <View style={styles.bottomPart}>
              <View style={[styles.enderPicture]}>
                <View style={[styles.titleAndStars]}>
                  <Text numberOfLines={1} style={[styles.title]}>
                    {data.title}
                  </Text>
                  <View style={[styles.stars]}>
                    <Entypo
                      name="star"
                      size={24}
                      color={data.ratingValue > 1 ? "gold" : "grey"}
                    />
                    <Entypo
                      name="star"
                      size={24}
                      color={data.ratingValue > 1 ? "gold" : "grey"}
                    />
                    <Entypo
                      name="star"
                      size={24}
                      color={data.ratingValue > 2 ? "gold" : "grey"}
                    />
                    <Entypo
                      name="star"
                      size={24}
                      color={data.ratingValue > 3 ? "gold" : "grey"}
                    />
                    <Entypo
                      name="star"
                      size={24}
                      color={data.ratingValue > 4 ? "gold" : "grey"}
                    />
                    <Text>{data.reviews} reviews</Text>
                  </View>
                </View>

                <View>
                  <Image
                    style={[styles.idPicture]}
                    source={{ uri: data.user.account.photo.url }}
                  />
                </View>
              </View>
              <Text
                numberOfLines={showText ? null : 3}
                style={styles.description}
              >
                {data.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <MapView
          style={{ height: 300 }}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  image: { width: "100%", height: 300, marginBottom: 30 },
  card: {
    borderColor: "#E9E9E9",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  pictureAndPrice: {
    position: "relative",
  },
  imgOffer: {
    height: 180,
    marginTop: 20,
  },
  price: {
    position: "absolute",
    top: 240,
    color: "white",
    backgroundColor: "black",
    height: 40,
    width: "20%",
    textAlign: "center",
    paddingTop: 4,
    fontSize: 20,
  },
  stars: {
    flexDirection: "row",
  },
  enderPicture: {
    marginTop: 5,
    marginLeft: "5%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  idPicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    marginVertical: 10,
  },
  titleAndStars: {
    width: "60%",
  },
  bottomPart: {
    alignItems: "center",
  },
  description: { width: "90%", marginTop: 20 },
});
