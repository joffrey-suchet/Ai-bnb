import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileScreen() {
  // const { params } = useRoute();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/user/:id"
        );
      };
    } catch (error) {
      console.log(error.message);
    }
  });
  return (
    <View>
      <Text>user id </Text>
    </View>
  );
}
