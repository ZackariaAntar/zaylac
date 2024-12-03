import { TouchableOpacity, Text } from "react-native";
import React, { useEffect } from "react";

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
	otherStyles,
	route,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary-100 rounded-xl text-white-100
            min-h-[62px] justify-center items-center ${containerStyles}
            ${isLoading ? "opacity-50" : " "}`}
			disabled={isLoading}
			style={otherStyles}
		>
			<Text className={`text-black-200 font-psemibold ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
