import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const DishListItem = ({ dish }) => {
 const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Foods",{id: dish.id})}
    style={styles.container}>
      <View style={{ flex: 1}}>
        <Text style={styles.name}>{dish.names}</Text>
        <Text style={styles.price}>₹ {dish.price}</Text>
      </View>
      {dish.image_url && (
        <Image source={{ uri: dish.image_url }} style={styles.image} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
  },
});

export default DishListItem;