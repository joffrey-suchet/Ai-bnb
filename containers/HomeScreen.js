import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={({ item }) => {
          // console.log(item.photos[0].url);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <View style={[styles.card]}>
                <View style={[styles.pictureAndPrice]}>
                  <Image
                    source={{ uri: item.photos[0].url }}
                    style={[styles.imgOffer]}
                  />
                  <Text style={[styles.price]}>{item.price} €</Text>
                </View>
                <View>
                  <View style={[styles.enderPicture]}>
                    <View style={[styles.titleAndStars]}>
                      <Text numberOfLines={1} style={[styles.title]}>
                        {item.title}
                      </Text>
                      <View style={[styles.stars]}>
                        <Entypo
                          name="star"
                          size={24}
                          color={item.ratingValue > 1 ? "gold" : "grey"}
                        />
                        <Entypo
                          name="star"
                          size={24}
                          color={item.ratingValue > 1 ? "gold" : "grey"}
                        />
                        <Entypo
                          name="star"
                          size={24}
                          color={item.ratingValue > 2 ? "gold" : "grey"}
                        />
                        <Entypo
                          name="star"
                          size={24}
                          color={item.ratingValue > 3 ? "gold" : "grey"}
                        />
                        <Entypo
                          name="star"
                          size={24}
                          color={item.ratingValue > 4 ? "gold" : "grey"}
                        />
                        <Text>{item.reviews} reviews</Text>
                      </View>
                    </View>

                    <View>
                      <Image
                        style={[styles.idPicture]}
                        source={{ uri: item.user.account.photo.url }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    width: "90%",
    marginLeft: "5%",
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
    top: 150,
    color: "white",
    backgroundColor: "black",
    height: 25,
    width: "15%",
    textAlign: "center",
    paddingTop: 2,
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
});
