import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

type AppContextType = {
  saveContactsToUserDevice: (contacts: any) => void;
  getContactsFromUserDevice: () => void;
  markContactComplete: (contactId: any) => void;
  deleteContact: (contactId: any) => void;
  clearAllContact: (selectedNumber: number) => void;
  unMarkSelectedContact: (contactId: any) => void;
  markSelectedContact: (contactId: any) => void;
  saveDeletedContactsToUserDevice: (contacts: any) => void;
  getDeletedContactsFromUserDevice: () => void;
  restoreContact: (contact: any) => void;
  markSelectedDeletedContact: (contactid: any) => void;
  unMarkSelectedDeletedContact: (contactid: any) => void;
  restoreAllSelectedContacts: () => void;
  restoreAllContact: (selectedNumber: number) => void;
  contacts: any[];
  setStartSearching: any;
  startSearching: boolean;
  deletedContacts: any[];
};

const AppContext = createContext<AppContextType>({
  saveContactsToUserDevice: () => {},
  getContactsFromUserDevice: () => {},
  markContactComplete: () => {},
  deleteContact: () => {},
  clearAllContact: () => {},
  unMarkSelectedContact: () => {},
  markSelectedContact: () => {},
  saveDeletedContactsToUserDevice: () => {},
  getDeletedContactsFromUserDevice: () => {},
  restoreContact: () => {},
  markSelectedDeletedContact: () => {},
  unMarkSelectedDeletedContact: () => {},
  restoreAllSelectedContacts: () => {},
  restoreAllContact: (selectedNumber: number) => {},
  contacts: [],
  setStartSearching: () => {},
  deletedContacts: [],
  startSearching: false,
});

export const AppContextProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState([]);
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [startSearching, setStartSearching] = useState(false);

  const saveContactsToUserDevice = async (contact: any) => {
    try {
      const stringifyTodos = JSON.stringify(contact);
      await AsyncStorage.setItem("contacts", stringifyTodos);
      setRefetch(true);
      setTimeout(() => setRefetch(false), 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getContactsFromUserDevice = async () => {
    try {
      const contact = await AsyncStorage.getItem("contacts");
      if (contact !== null) {
        setContacts(JSON.parse(contact));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveDeletedContactsToUserDevice = async (contact: any) => {
    try {
      const stringifyTodos = JSON.stringify(contact);
      await AsyncStorage.setItem("deleted_contacts", stringifyTodos);
      setRefetch(true);
      setTimeout(() => setRefetch(false), 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeletedContactsFromUserDevice = async () => {
    try {
      const contact = await AsyncStorage.getItem("deleted_contacts");
      if (contact !== null) {
        setDeletedContacts(JSON.parse(contact));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markContactComplete = (contactId: any) => {
    const newTodosItem = contacts.map((item: any) => {
      if (item.id == contactId) {
        return { ...item, completed: true };
      }
      return item;
    });

    setContacts(newTodosItem as any);
  };

  const markSelectedContact = (contactId: any) => {
    const newContactsItem = contacts.map((item: any) => {
      if (item.id == contactId) {
        return { ...item, delete: true };
      }
      return item;
    });
    saveContactsToUserDevice(newContactsItem as any);
  };

  const unMarkSelectedContact = (contactId: any) => {
    const newContactsItem = contacts.map((item: any) => {
      if (item.id == contactId) {
        return { ...item, delete: false };
      }
      return item;
    });
    saveContactsToUserDevice(newContactsItem as any);
  };

  const markSelectedDeletedContact = (contactId: any) => {
    const newContactsItem = deletedContacts.map((item: any) => {
      if (item.id == contactId) {
        return { ...item, isRestore: true };
      }
      return item;
    });
    saveContactsToUserDevice(newContactsItem as any);
  };

  const unMarkSelectedDeletedContact = (contactId: any) => {
    const newContactsItem = deletedContacts.map((item: any) => {
      if (item.id == contactId) {
        return { ...item, isRestore: false };
      }
      return item;
    });
    saveDeletedContactsToUserDevice(newContactsItem as any);
  };

  const restoreAllSelectedContacts = () => {
    const remainingContacts = deletedContacts.filter(
      (item: any) => item.isRestore === true
    );
    const allDeletedContacts = deletedContacts.filter(
      (item: any) => item.isRestore !== true
    );

    saveDeletedContactsToUserDevice(allDeletedContacts);
    saveContactsToUserDevice([...remainingContacts, ...contacts]);
  };

  const restoreContact = (contactId: any) => {
    const newContactsItem = deletedContacts.filter(
      (item: any) => item.id !== contactId
    );
    const newDeletedContactsItem = deletedContacts.filter(
      (item: any) => item.id === contactId
    );
    saveDeletedContactsToUserDevice(newDeletedContactsItem);
    saveContactsToUserDevice([...newContactsItem, ...contacts]);
  };

  const deleteAllSelectedContacts = () => {
    const remainingContacts = contacts.filter(
      (item: any) => item.delete !== true
    );
    const deletedContacts = contacts.filter(
      (item: any) => item.delete === true
    );

    saveDeletedContactsToUserDevice(deletedContacts);
    saveContactsToUserDevice(remainingContacts);
  };

  const deleteContact = (contactId: any) => {
    const newContactsItem = contacts.filter(
      (item: any) => item.id !== contactId
    );
    const newDeletedContactsItem = contacts.filter(
      (item: any) => item.id === contactId
    );
    saveDeletedContactsToUserDevice(newDeletedContactsItem);
    saveContactsToUserDevice(newContactsItem);
  };

  const clearAllContact = (selectedNumber: number) => {
    Alert.alert(
      "Confirm",
      `Are you sure you want to delete ${selectedNumber} ${
        selectedNumber === 1 ? "contact" : "contacts"
      } ?`,
      [
        {
          text: "Yes",
          onPress: () => deleteAllSelectedContacts(),
        },
        {
          text: "No",
        },
      ]
    );
  };

  const restoreAllContact = (selectedNumber: number) => {
    Alert.alert(
      "Confirm",
      `Are you sure you want to restore ${selectedNumber} ${
        selectedNumber === 1 ? "contact" : "contacts"
      } ?`,
      [
        {
          text: "Yes",
          onPress: () => restoreAllSelectedContacts(),
        },
        {
          text: "No",
        },
      ]
    );
  };

  React.useEffect(() => {
    getContactsFromUserDevice();
  }, [contacts, refetch]);

  React.useEffect(() => {
    getDeletedContactsFromUserDevice();
  }, [deletedContacts, refetch]);

  return (
    <AppContext.Provider
      value={{
        saveContactsToUserDevice,
        getContactsFromUserDevice,
        markContactComplete,
        deleteContact,
        markSelectedContact,
        unMarkSelectedContact,
        saveDeletedContactsToUserDevice,
        getDeletedContactsFromUserDevice,
        clearAllContact,
        restoreContact,
        markSelectedDeletedContact,
        unMarkSelectedDeletedContact,
        restoreAllSelectedContacts,
        restoreAllContact,
        deletedContacts,
        setStartSearching,
        startSearching,
        contacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
