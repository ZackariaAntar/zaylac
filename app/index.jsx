import { View, Text, Image, ScrollView } from "react-native";
    import { StatusBar } from "expo-status-bar";
    import { Redirect, router} from "expo-router";
    import {  SafeAreaView} from "react-native-safe-area-context";

    import { image } from "../constants"; 
    import CustomButton from "../components/CustomButton/CustomButton";
   

    export default function App ()  {

        const handlePress = () =>{
            router.push('/sign-in'); 

        }

    return (

        <SafeAreaView className="bg-primary h-full">

            <ScrollView contentContainerStyle={{height:'100% '}}>

            <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image
                        source={image.logo}
                        className="w-[180px] h-[115px]"
                        resizeMode="contain"
                    />

                    <Image
                        source={image.cards}
                        className="max-w-[380px] w-full h-[298px] -mt-4"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                        Your Circle, Your Savings, Your Future with, {' '}

                            <Text className="text-secondary-100">Kaayo</Text>
                        </Text>

                        <Image
                            source={image.path} 
                            className="w-[236px] h-[15px] absolute
                            -bottom-3 -right-4"
                            resizeMode ="contain"
                        />
                
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
                    Where Collaboration with your famalies, friends and collegeus Meets Financial Strength:
                    Kaayo helps you save and grow as a community.
                    </Text>

                    <CustomButton
                        title="Continue With Email"
                        handlePress ={handlePress}
                        containerStyles ="w-full mt-7"

                    />

            </View>
                
            </ScrollView>
            <StatusBar
                backgroundColor="#FEE9E7"
                style="light"
            />
        </SafeAreaView>
    )
    }

