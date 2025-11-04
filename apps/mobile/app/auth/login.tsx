import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center bg-white px-6 dark:bg-zinc-900">
      <Stack.Screen options={{ title: "Login" }} />
      <Text className="text-3xl font-semibold text-zinc-900 dark:text-white">Welcome back</Text>
      <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Sign in to access your recipes anywhere.
      </Text>
      <View className="mt-6 space-y-4">
        <View>
          <Text className="text-xs uppercase text-zinc-500 dark:text-zinc-400">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="mt-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </View>
        <View>
          <Text className="text-xs uppercase text-zinc-500 dark:text-zinc-400">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="mt-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </View>
        <Pressable className="mt-4 rounded-xl bg-indigo-600 p-4">
          <Text className="text-center text-sm font-semibold text-white">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}
