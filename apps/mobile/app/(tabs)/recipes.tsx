import { FlatList, Pressable, Text, View } from "react-native";

const recipes = [
  { id: "1", title: "Creamy Tomato Soup", rating: 4.8, totalMinutes: 30 },
  { id: "2", title: "Miso Glazed Cod", rating: 4.9, totalMinutes: 25 },
  { id: "3", title: "Charred Broccolini Pasta", rating: 4.6, totalMinutes: 20 }
];

export default function RecipesScreen() {
  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-zinc-900">
      <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        className="mt-6"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Pressable className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</Text>
            <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {item.totalMinutes} min · {item.rating.toFixed(1)}★
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
