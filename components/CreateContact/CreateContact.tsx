import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../../contexts/appContext";
import { styles } from "./styles";

function CreateContact({ navigation }: any) {
  const { saveContactsToUserDevice, contacts } = useAppContext();

  const [contactName, setContactName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");

  const handleSubmit = () => {
    const findContact = contacts?.find(
      (contact: any) =>
        contact?.contact_name === contactName &&
        contact?.contact_number === contactNumber
    );
    const findNumber = contacts?.find(
      (contact: any) => contact?.contact_number === contactNumber
    );
    const findName = contacts?.find(
      (contact: any) => contact?.contact_name === contactName
    );

    const data = {
      contact_name: contactName,
      contact_number: contactNumber,
      id: Math.random().toString(),
      created_at: new Date().toString(),
    };

    if (!contactName && !contactNumber) {
      Alert.alert("Error", "Please input Value");
    } else if (findContact) {
      Alert.alert("Info", "Contact already exists");
    } else if (findNumber) {
      Alert.alert("Info", "Number already exists");
    } else if (findName) {
      Alert.alert("Info", "Name already exists");
    } else if (!(contactNumber.length === 11)) {
      Alert.alert("Info", "Number must be upto 11");
    } else if (
      contactName &&
      contactNumber.length === 11 &&
      !findNumber &&
      !findName &&
      !findContact
    ) {
      const newAddedContact = [...contacts, data];
      saveContactsToUserDevice(newAddedContact);
      navigation.navigate("HOME");
    }
  };

  return (
    <View style={styles.form_container}>
      <Text style={styles.no_contact_text}>Add Contact</Text>
      <View style={styles.avatar_container}>
        <Icon name="people" size={50} color="cadetblue" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={contactName}
          placeholder="Contact Name"
          onChangeText={(value: any) => setContactName(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={contactNumber}
          placeholder="Contact Number"
          keyboardType="numeric"
          maxLength={11}
          keyboardAppearance={"default"}
          onChangeText={(value: any) => setContactNumber(value)}
        />
      </View>
      <TouchableOpacity style={styles.form_button} onPress={handleSubmit}>
        <Text style={styles.form_button_text}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateContact;
