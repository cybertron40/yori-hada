import { FlatList, Text, View } from "react-native";

const planner = [
  {
    id: "1",
    date: "Mon",
    meals: [
      { slot: "Breakfast", title: "Berry Chia Parfait" },
      { slot: "Dinner", title: "Sesame Ginger Tofu" }
    ]
  },
  {
    id: "2",
    date: "Tue",
    meals: [
      { slot: "Dinner", title: "Smoky Black Bean Soup" }
    ]
  }
];

export default function PlannerScreen() {
  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-zinc-900">
      <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">Planner</Text>
      <FlatList
        data={planner}
        keyExtractor={(item) => item.id}
        className="mt-6"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
            <Text className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {item.date}
            </Text>
            {item.meals.map((meal) => (
              <View key={`${item.id}-${meal.slot}`} className="mt-2">
                <Text className="text-xs uppercase text-zinc-500 dark:text-zinc-400">{meal.slot}</Text>
                <Text className="text-sm font-medium text-zinc-900 dark:text-white">{meal.title}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
