import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../../contexts/appContext";
import { styles } from "./styles";

function ContactDetails({ navigation, route }: any) {
  const { contactId } = route?.params;
  const { contacts, deleteContact } = useAppContext();
  const contactsDetails = contacts?.find(
    (contact: any) => contact?.id === contactId
  );
  const editThisContact = () => {
    navigation.navigate("EDIT_CONTACT", { contactId: contactId });
  };
  const deleteThisContact = () => {
    deleteContact(contactId);
    navigation.navigate("HOME");
  };

  const copyToClipboard = () => {
    Clipboard.setString(contactsDetails.contact_number);
  };

  return (
    <View>
      <View style={styles.avatar_container}>
        <Icon name="people" size={50} color="cadetblue" />
      </View>
      <Text style={styles.contact_text}>{contactsDetails.contact_name}</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={styles.contact_text}>
          {contactsDetails.contact_number}
        </Text>
      </TouchableOpacity>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={editThisContact}>
          <View style={styles.buttons}>
            <Text style={styles.text}>Edit</Text>
            <Icon name="edit" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteThisContact}>
          <View style={styles.buttons}>
            <Text style={styles.text}>Delete</Text>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ContactDetails;
