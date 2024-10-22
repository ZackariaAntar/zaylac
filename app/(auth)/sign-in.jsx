import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image } from "react-native";

import { image } from "../../constants";

const SignIn = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center h-full px-4 mt-6">
					<Image
						source={image.logo}
						className="w-[180px] h-[115px]"
						resizeMode="contain"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
