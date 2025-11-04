import { Tabs } from "expo-router";
import { ChefHat, Fridge, ShoppingCart, CalendarRange, Compass } from "lucide-react-native";

const tabs = [
  { name: "index", title: "Home", icon: ChefHat },
  { name: "recipes", title: "Recipes", icon: ChefHat },
  { name: "pantry", title: "Pantry", icon: Fridge },
  { name: "grocery", title: "Grocery", icon: ShoppingCart },
  { name: "planner", title: "Planner", icon: CalendarRange },
  { name: "discovery", title: "Discover", icon: Compass }
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#6b7280",
        headerShown: false
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => {
              const Icon = tab.icon;
              return <Icon color={color} size={size} />;
            }
          }}
        />
      ))}
    </Tabs>
  );
}
