import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Picker,
  Text,
} from "react-native";
import MyHeader from "../components/myHeader";
import DatePicker from "react-native-datepicker";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";
import firebase from "firebase";
import db from "../config";
import { RadioButton, } from 'react-native-paper';

export default class FillDailyMilk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      dt: null,
      registrationDate: "",
      hand: "0",
      userId: firebase.auth().currentUser.email,
      type: "CowMilk",
    };
  }
  checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }
  dateTimeInputChangeHandler = (e) => {
    this.type = "text";
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[1]) values[1] = this.checkValue(values[1], 12);
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + "/" : v;
    });
    this.setState({
      registrationDate: output.join("").substr(0, 14),
    });
  };

  addingMilkTransactions = () => {
    db.collection("all_transactions").add({
      user_id: this.state.userId,
      date: this.state.date,
      litres_of_milk: this.state.hand,
      type_of_milk:this.state.type
    });
    Alert.alert("Transaction Added Successfully");
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Calendar" navigation={this.props.navigation} />
        <Text style={styles.title}>Fill the Date Here👎</Text>
        <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={{ width: 300 }}
          date={this.state.date}
          mode="date"
          placeholder="DD/MM/YYYY"
          format="DD-MM-YYYY"
          maxDate={moment().format("DD-MM-YYYY")}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
            },
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
            // Alert.alert(
            //   this.state.date + "\nyou have taken 2 litres of cow milk"
            //);
          }}
        />
        <Text style={styles.title}>
          Fill the number of Litres of Milk you want
        </Text>
        <View>
          <Picker
            selectedValue={this.state.hand}
            onValueChange={(hand) => this.setState({ hand })}
            style={{
              width: 160,
              marginTop: 10,
              borderColor: "green",
              borderRadius: 5,
            }}
            mode="dropdown"
          >
            <Picker.Item label="No Milk" value="0" />
            <Picker.Item label="500 ml" value="500" />
            <Picker.Item label="1 Litre" value="1" />
            <Picker.Item label="1.5 Litres" value="1.5" />
            <Picker.Item label="2 Litres" value="2" />
            <Picker.Item label="2.5 Litres" value="2.5" />
            <Picker.Item label="3.5 Litres" value="3.5" />
            <Picker.Item label="4 Litres" value="4" />
            <Picker.Item label="4.5 Litres" value="4.5" />
            <Picker.Item label="5 Litres" value="5" />
            <Picker.Item label="5.5 Litres" value="5.5" />
          </Picker>
        </View>
        <View>
          <RadioButton.Group
            onValueChange={(value) => this.setState({type:value })}
            value={this.state.type}
          >
            <View style={{flexDirection:"row"}}>
            <View >
              <Text>Cow Milk</Text>
              <RadioButton value="CowMilk" />
            </View>
            <View>
              <Text>Buffalo Milk</Text>
              <RadioButton value="BuffaloMilk" />
            </View>
            </View>
          </RadioButton.Group>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.addingMilkTransactions();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#90EE90",
    shadowColor: "#000",
    marginBottom: RFValue(5),
    marginTop: RFValue(20),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  // buttonText: {
  //   color: "#FF1493",
  //   fontWeight: 550,
  //   fontSize: RFValue(20),
  // },
});
