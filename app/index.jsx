import { View, Text, Image, ScrollView } from "react-native";
    import { StatusBar } from "expo-status-bar";
    import { Link } from "expo-router";
    import {  SafeAreaView} from "react-native-safe-area-context";

    import { image } from "../constants"; 

    export default function App ()  {

    return (

        <SafeAreaView className="bg-primary h-full">

            <ScrollView contentContainerStyle={{height: '100%'}}>

            <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={image.logo}
                        className="w-[214px] h-[84px]"
                        resizeMode="contain"
                    />

                    <Image
                        source={image.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />
            </View>
                
            </ScrollView>
        </SafeAreaView>
    )
    }

