import { StyleSheet} from "react-native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { supabase } from "../utils/supabase/supabaseClient";
import { StatusBar } from "expo-status-bar";
import { setAuthData } from "@/redux/slices/authSlice";

SplashScreen.preventAutoHideAsync();

const App = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const router = useRouter();


		const styleOptions = {
			headerStyle: {
				backgroundColor: "#006B61",
			},
			headerTitleStyle: {
				fontWeight: "700",
				color: "#fff",
			},
		};

	// Centralized Supabase auth state management
	useEffect(() => {
		console.log("App Loaded");
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth State:", "event:", event, "session:", session);
			switch (event) {
				case "INITIAL_SESSION":
					if (session?.user) {
						router.push("home");
					}else{
            router.replace('/')
          }
					setLoading(false);
					break;
				case "SIGNED_IN":
					console.log("User signed in");
					if (session?.user) {
						dispatch(setAuthData(session.user.id));
					}
					router.push("home");
					setLoading(false);
					break;
				case "SIGNED_OUT":
					console.log("User signed out");
					router.replace("/sign-in");
					setLoading(false);
					break;
				default:
					setLoading(false);
			}
		});

		// Clean up the subscription on unmount
		return () => {
			data.subscription.unsubscribe();
		};
	}, [dispatch, router]);



	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{...styleOptions,
					headerShown: true,
					title: "Kaayo",
				}}
			/>
			<Stack.Screen
				name="(auth)"
				options={{
					...styleOptions,
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="(tabs)"
				options={{
					...styleOptions,
					headerShown: false,
				}}
			/>
		</Stack>
	);
};


const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);


	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
				<StatusBar backgroundColor="#FEE9E7" style="light" />
			</PersistGate>
		</Provider>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
