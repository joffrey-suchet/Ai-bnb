import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          username: name,
          description: description,
          password: password,
        }
      );
      if (response.data) {
        console.log(response.data);
        alert("bravo vous avez créez un compte");
        const userToken = "secret-token";
        setToken(userToken);
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
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
        <Text style={styles.enderLogo}>Sign up</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />

          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            placeholder="descripion"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
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

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={async () => {
                if (password === confirmPassword) {
                  if (name && email && description && password) {
                    // console.log("passage all input is ok");
                    signup();
                  } else {
                    console.log("erreur");
                    alert("Remplir tous les Champs");
                  }
                } else {
                  alert("les mots de passes doivent être identique");
                }
              }}
            >
              <Text>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.noAccount}>
                Already have an account? Sign in
              </Text>
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
    justifyContent: "space-around",
    height: "60%",
    width: "80%",
  },
  input: { width: "100%", borderBottomColor: "#FFBAC0", borderBottomWidth: 2 },
  descriptionInput: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 80,
  },
  bottomButtons: { alignItems: "center" },
  buttonSignUp: {
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
  noAccount: { color: "#717171" },
});
