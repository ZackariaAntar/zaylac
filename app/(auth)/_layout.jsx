import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


const AuthLayout = () => {
	const styleOptions = {
		headerShown: true,
		headerStyle: {
			backgroundColor: "#006B61",
		},
		headerTitleStyle: {
			fontWeight: "700",
			color: "#fff",
		},
	};

	return (
		<>
			<Stack>
				<Stack.Screen
					name="sign-in"
					options={{ ...styleOptions, title: "Sign In" }}
				/>

				<Stack.Screen
					name="sign-up"
					options={{ ...styleOptions, title: "Sign Up" }}
				/>
			</Stack>

			<StatusBar backgroundColor="#FEE9E7" style="light" />
		</>
	);
};

export default AuthLayout;
