import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../../contexts/appContext";
import { styles } from "./styles";

export const ContactItem = ({
  contact,
  navigation,
  isDeletedContacts,
}: any) => {
  const {
    markSelectedContact,
    unMarkSelectedContact,
    deleteContact,
    startSearching,
    restoreContact,
    markSelectedDeletedContact,
    unMarkSelectedDeletedContact,
  } = useAppContext();
  const checkContactDetails = () => {
    if (!isDeletedContacts) {
      navigation.navigate("CONTACT_DETAILS", { contactId: contact.id });
    }
  };
  const editContactDetails = () => {
    if (!isDeletedContacts) {
      navigation.navigate("EDIT_CONTACT", { contactId: contact.id });
    }
  };
  return (
    <TouchableOpacity onPress={checkContactDetails}>
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
              textDecorationLine: isDeletedContacts
                ? contact?.isRestore
                  ? "line-through"
                  : "none"
                : contact.delete
                ? "line-through"
                : "none",
            }}
          >
            {contact?.contact_name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "white",
              textDecorationLine: isDeletedContacts
                ? contact?.isRestore
                  ? "line-through"
                  : "none"
                : contact.delete
                ? "line-through"
                : "none",
            }}
          >
            {contact?.contact_number}
          </Text>
        </View>

        {!startSearching && (
          <View>
            {!isDeletedContacts ? (
              <>
                {!contact?.delete ? (
                  <TouchableOpacity
                    onPress={() => markSelectedContact(contact?.id)}
                  >
                    <View style={styles.actionIcon}>
                      <Icon name="" size={20} color="cadetblue" />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => unMarkSelectedContact(contact?.id)}
                  >
                    <View style={styles.actionIcon}>
                      <Icon name="done" size={20} color="cadetblue" />
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                {!contact?.isRestore ? (
                  <TouchableOpacity
                    onPress={() => markSelectedDeletedContact(contact?.id)}
                  >
                    <View style={styles.actionIcon}>
                      <Icon name="" size={20} color="cadetblue" />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => unMarkSelectedDeletedContact(contact?.id)}
                  >
                    <View style={styles.actionIcon}>
                      <Icon name="done" size={20} color="cadetblue" />
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
        {!isDeletedContacts && (
          <TouchableOpacity onPress={editContactDetails}>
            <View style={styles.actionIcon}>
              <Icon name="edit" size={20} color="cadetblue" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={
            isDeletedContacts
              ? () => restoreContact(contact?.id)
              : () => deleteContact(contact?.id)
          }
        >
          <View style={styles.actionIcon}>
            <Icon
              name={isDeletedContacts ? "circle" : "delete"}
              size={20}
              color="cadetblue"
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
