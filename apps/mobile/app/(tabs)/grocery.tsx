import { FlatList, Pressable, Text, View } from "react-native";

const groceryItems = [
  { id: "1", name: "Lemons", aisle: "Produce", quantity: "4" },
  { id: "2", name: "Greek Yogurt", aisle: "Dairy", quantity: "1 tub" },
  { id: "3", name: "Fresh Dill", aisle: "Produce", quantity: "1 bunch" }
];

export default function GroceryScreen() {
  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-zinc-900">
      <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">Grocery List</Text>
      <FlatList
        data={groceryItems}
        keyExtractor={(item) => item.id}
        className="mt-6"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Pressable className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.name}</Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-300">{item.quantity}</Text>
            <Text className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {item.aisle}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
