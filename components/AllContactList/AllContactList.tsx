import React from "react";
import { FlatList } from "react-native";
import { ContactItem } from "../EachContactList/ContactList";

function AllContactList({ contacts, navigation, isDeletedContacts }: any) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      data={contacts}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          navigation={navigation}
          isDeletedContacts={isDeletedContacts}
        />
      )}
    />
  );
}

export default AllContactList;
