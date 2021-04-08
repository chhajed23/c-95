import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     userId: firebase.auth().currentUser.email,
  //     image: "#",
  //     name: "",
  //     docId: "",
  //   };
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              this.props.navigation.navigate("CalenderScreen");
            }}
          ></TouchableOpacity>
          <Image
            source={require("../assets/drawer.png")}
            style={styles.santaImage}
          />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.6,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
    flexDirection: "row",
  },
  logOutButton: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  logOutText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    marginLeft: RFValue(30),
  },
  santaImage: {
    // width: "99%",
    // height: "400%",
    marginBottom: 500,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    // resizeMode: "stretch"
  },
});
