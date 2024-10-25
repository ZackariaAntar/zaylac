
import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField/FormField";
import { image } from "../../constants";

import CustomButton from "../../components/CustomButton/CustomButton";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
const submit = () => {

}
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-4 mt-6">
                    <Image
                        source={image.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl text-white-100 text-semibold mt-10 font-psemibold">
                        Log in to Kaayo
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Enter your email"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Enter your password"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        secureTextEntry
                    />

                    <CustomButton

                    title="Sign In"
                    handlePress = {submit}
                    containerStyles="mt-7"
                    
                    />

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
