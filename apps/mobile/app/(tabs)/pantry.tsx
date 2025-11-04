import { FlatList, Text, View } from "react-native";

const pantryItems = [
  { id: "1", name: "Chickpeas", quantity: "3 cans", expiresOn: "2025-01-10" },
  { id: "2", name: "Basmati Rice", quantity: "1.5 kg", expiresOn: "2024-12-01" },
  { id: "3", name: "Tahini", quantity: "1 jar", expiresOn: "2024-09-15" }
];

export default function PantryScreen() {
  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-zinc-900">
      <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">Pantry</Text>
      <FlatList
        data={pantryItems}
        keyExtractor={(item) => item.id}
        className="mt-6"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.name}</Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-300">{item.quantity}</Text>
            <Text className="text-xs text-amber-600 dark:text-amber-400">Expires {item.expiresOn}</Text>
          </View>
        )}
      />
    </View>
  );
}
