import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-2xl color-white font-pbold">Kaayo</Text>
      <StatusBar/>
      
    </View>
  );
}