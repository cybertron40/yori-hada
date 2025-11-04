import { FlatList, Pressable, Text, View } from "react-native";

const discoveries = [
  {
    id: "1",
    title: "Harissa Roasted Carrots",
    source: "Minimalist Baker",
    freshness: "New"
  },
  {
    id: "2",
    title: "Smoked Paprika Chili",
    source: "Serious Eats",
    freshness: "1 day"
  }
];

export default function DiscoveryScreen() {
  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-zinc-900">
      <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">Discovery</Text>
      <FlatList
        data={discoveries}
        keyExtractor={(item) => item.id}
        className="mt-6"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Pressable className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-300">{item.source}</Text>
            <Text className="text-xs text-emerald-600 dark:text-emerald-400">{item.freshness}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
