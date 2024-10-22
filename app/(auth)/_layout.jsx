import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="sign-in"
					opptions={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name="sign-up"
					opptions={{
						headerShown: false,
					}}
				/>
			</Stack>
			<StatusBar backgroundColor="#FEE9E7" style="light" />
		</>
	);
};

export default AuthLayout;
