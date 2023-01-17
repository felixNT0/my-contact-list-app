import { default as React, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../../contexts/appContext";
import AllContactList from "../AllContactList/AllContactList";
import { styles } from "./styles";

function DeletedContacts({ navigation }: any) {
  const {
    deletedContacts,
    setStartSearching,
    startSearching,
    restoreAllContact,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");

  const handleNavigate = () => {
    navigation.navigate("HOME");
  };

  const selectedContacts =
    deletedContacts?.filter((item: any) => item?.isRestore === true) || [];

  const searchResults = useMemo(
    () =>
      deletedContacts?.filter(
        (item: any) =>
          item?.contact_name
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item?.contact_number
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  useEffect(() => {
    if (!startSearching) {
      setSearchValue("");
    }
  }, [startSearching]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <>
        <View
          style={!startSearching ? styles.header : styles.header_for_searching}
        >
          {!startSearching ? (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "cadetblue",
              }}
            >
              ALL DELETED CONTACTS
            </Text>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                value={searchValue}
                placeholder="Search For Contacts Here..."
                onChangeText={(value: any) => setSearchValue(value)}
              />
            </View>
          )}
          <View style={styles.delete_button}>
            {!startSearching && selectedContacts?.length > 0 && (
              <>
                <Text>{selectedContacts?.length}</Text>
                <TouchableOpacity>
                  <Icon
                    name="circle"
                    size={25}
                    color="cadetblue"
                    onPress={() => restoreAllContact(selectedContacts?.length)}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <TouchableOpacity>
            <Icon
              name={!startSearching ? "search" : "close"}
              size={25}
              color="cadetblue"
              onPress={() => setStartSearching(!startSearching)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        {deletedContacts.length === 0 && (
          <Text style={styles.no_contact_text}>No Contact Deleted Yet</Text>
        )}
        {searchValue && startSearching && searchResults?.length === 0 && (
          <Text style={styles.no_contact_text}>
            {searchValue} Search not found
          </Text>
        )}
        <AllContactList
          contacts={searchValue ? searchResults : deletedContacts}
          navigation={navigation}
          isDeletedContacts={true}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.iconContainer}>
              <Icon name="home" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </>
    </SafeAreaView>
  );
}

export default DeletedContacts;
