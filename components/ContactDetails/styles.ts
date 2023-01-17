import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  avatar_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  button_container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  text: { marginRight: 10 },
  buttons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "cadetblue",
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  contact_text: {
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
