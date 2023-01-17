import { StyleSheet, View } from "react-native";
import { AppContextProvider } from "./contexts/appContext";
import Routes from "./Routes";

export default function App() {
  return (
    <View style={styles.container}>
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
