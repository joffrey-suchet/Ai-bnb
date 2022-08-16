import { view, Text, Image } from "react-native";

const LogoHeader = () => {
  return (
    <Image
      style={{ height: 60, width: 60, marginHorizontal: 150 }}
      source={require("../assets/images/Logo.png")}
    />
  );
};

export default LogoHeader;
