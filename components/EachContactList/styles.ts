import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "",
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    padding: 20,
    backgroundColor: "cadetblue",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
