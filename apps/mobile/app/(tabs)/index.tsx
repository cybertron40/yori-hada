import { ScrollView, Text, View } from "react-native";

const highlights = [
  {
    title: "Stay synced",
    description: "Offline-first data keeps recipes and pantry in sync across devices."
  },
  {
    title: "Smart grocery",
    description: "Merge ingredients and keep aisles organized automatically."
  }
];

export default function MobileHomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-6 py-10 dark:bg-zinc-900">
      <Text className="text-3xl font-semibold text-zinc-900 dark:text-white">Recipe Atlas</Text>
      <Text className="mt-2 text-base text-zinc-600 dark:text-zinc-300">
        Welcome back. Here is what is on your menu this week.
      </Text>
      <View className="mt-6 space-y-4">
        {highlights.map((item) => (
          <View key={item.title} className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</Text>
            <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
