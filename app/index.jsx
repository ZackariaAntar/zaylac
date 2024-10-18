import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Kaayo</Text>
      <StatusBar/>
      
    </View>
  );
}