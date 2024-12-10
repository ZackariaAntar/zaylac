import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
	otherStyles,
	disabled,
	route,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary-100 rounded-xl text-white-100
            min-h-[62px] justify-center items-center ${containerStyles}
            ${isLoading || disabled ? "opacity-50" : " "}`}
			disabled={disabled}
			style={otherStyles}
		>
			{isLoading ? (
				<ActivityIndicator size="large" color='pink' />
			) : (
				<Text className={`text-black-200 font-psemibold ${textStyles}`}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;
