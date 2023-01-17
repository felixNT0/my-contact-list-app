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
import useBioMetric from "../../hooks/useBioMetric";
import AllContactList from "../AllContactList/AllContactList";
import { styles } from "./styles";

function Home({ navigation }: any) {
  const { contacts, clearAllContact, setStartSearching, startSearching } =
    useAppContext();

  const { BioMetric, handleBioMeticAuth } = useBioMetric();

  const [searchValue, setSearchValue] = useState("");

  const handleNavigate = () => {
    navigation.navigate("CREATE_CONTACT");
  };

  const handleNavigateDeletedContactList = () => {
    navigation.navigate("DELETED_CONTACT");
  };

  const selectedContacts =
    contacts?.filter((item: any) => item?.delete === true) || [];

  const searchResults = useMemo(
    () =>
      contacts?.filter(
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
      {BioMetric ? (
        <>
          <View
            style={
              !startSearching ? styles.header : styles.header_for_searching
            }
          >
            {!startSearching ? (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "cadetblue",
                }}
              >
                MY CONTACTS LIST APP
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
                      name="delete"
                      size={25}
                      color="red"
                      onPress={() => clearAllContact(selectedContacts?.length)}
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
          {contacts.length === 0 && (
            <Text style={styles.no_contact_text}>No Contact Added Yet</Text>
          )}
          {searchValue && startSearching && searchResults?.length === 0 && (
            <Text style={styles.no_contact_text}>
              {searchValue} Search not found
            </Text>
          )}
          <AllContactList
            contacts={searchValue ? searchResults : contacts}
            navigation={navigation}
            isDeletedContacts={false}
          />
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleNavigate}>
              <View style={styles.iconContainer}>
                <Icon name="add" color="white" size={30} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateDeletedContactList}>
              <View style={styles.iconContainer2}>
                <Icon name="delete" color="white" size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.not_verify}>
          <Text style={styles.not_verify_welcome_text}>
            MY CONTACTS LIST APP
          </Text>
          <Text style={styles.not_verify_text}>Verify to use the App</Text>
          <TouchableOpacity
            style={styles.form_button}
            onPress={handleBioMeticAuth}
          >
            <Text style={styles.form_button_text}>Verify Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Home;
