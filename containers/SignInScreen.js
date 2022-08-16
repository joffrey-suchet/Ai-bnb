import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      if (response.data) {
        console.log(response.data);
        const userToken = "secret-token";
        alert("bravo vous êtes connectez");
        setToken(userToken);
      }
    } catch (error) {
      alert("erreur email ou password");
      console.log(error.response.data.error);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={{
            height: 150,
            width: 150,
            marginTop: 40,
          }}
        />
        <Text style={styles.enderLogo}>Sign in</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Button
            title="Sign in"
            onPress={async () => {
              if (email && password) {
                {
                  signin();
                }
              } else {
                alert("remplir tous les champs!!");
              }
            }}
          />
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={async () => {
                if (email && password) {
                  {
                    signin();
                  }
                } else {
                  alert("remplir tous les champs!!");
                }
              }}
            >
              <Text>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>No account? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: { alignItems: "center" },
  enderLogo: {
    marginBottom: 40,
    fontSize: 40,
    color: "#717171",
  },
  container: {
    width: "80%",
    height: "60%",
    justifyContent: "space-around",
  },
  input: { width: "100%", borderBottomColor: "#FFBAC0", borderBottomWidth: 2 },
  descriptionInput: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    marginBottom: 50,
  },
  bottomButtons: { alignItems: "center" },
  buttonSignIn: {
    borderWidth: 2,
    borderColor: "#F9585D",
    marginTop: 30,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
});
