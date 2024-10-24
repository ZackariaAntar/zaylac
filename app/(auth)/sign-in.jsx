import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image } from "react-native";

import FormField from "../../components/FormField/FormField"
import { image } from "../../constants";

const SignIn = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center h-full px-4 mt-6">
					<Image
						source={image.logo}
						className="w-[115px] h-[35px]"
						resizeMode="contain"
					/>
                    <Text className="text-2xl text-white-100 text-semibold 
                    mt-10 font-psemibold">Log in to Kaayo</Text>
                    <FormField/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
