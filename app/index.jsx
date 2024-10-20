import {  View, Text } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
export default function App ()  {

return (

    <View className="flex-1 items-center justify-center bg-primary">
        <Text className="text-5xl font-pbold">Kaayo</Text>
        <StatusBar style="uato"/>
        <Link href="/home" style={{color:'blue'}}> Go Home</Link>
    </View>
)
}

