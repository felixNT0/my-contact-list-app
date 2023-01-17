import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../../contexts/appContext";
import { styles } from "./styles";

function EditContact({ navigation, route }: any) {
  const { contactId } = route?.params;
  const { saveContactsToUserDevice, contacts } = useAppContext();

  const contactsDetails = contacts?.find(
    (contact: any) => contact?.id === contactId
  );

  const [contactName, setContactName] = useState<string>(
    contactsDetails?.contact_name
  );
  const [contactNumber, setContactNumber] = useState<string>(
    contactsDetails?.contact_number
  );

  const handleSubmit = () => {
    const data = {
      contact_name: contactName,
      contact_number: contactNumber,
      id: contactsDetails?.id,
      created_at: contactsDetails?.created_at,
      updated_at: new Date().toString(),
    };

    if (!contactName && !contactNumber) {
      Alert.alert("Error", "Please input Value");
    } else {
      const contactIndex = contacts.findIndex(
        (contact: any) => contact?.id === contactId
      );
      contacts[contactIndex] = data;
      saveContactsToUserDevice(contacts);
      navigation.navigate("HOME");
    }
  };
  return (
    <View style={styles.form_container}>
      <Text style={styles.no_contact_text}>Edit Contact</Text>
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
          onChangeText={(value: any) => setContactNumber(value)}
        />
      </View>
      <TouchableOpacity style={styles.form_button} onPress={handleSubmit}>
        <Text style={styles.form_button_text}>Edit Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditContact;
