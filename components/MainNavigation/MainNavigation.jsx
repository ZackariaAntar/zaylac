import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { router, useRouter} from "expo-router";
// SplashScreen.preventAutoHideAsync();
export default function MainNavigation(params) {
    const expoRouter = useRouter()
	useEffect(() => {
		console.log("AUTH:", auth.session);
	}, []);
	const auth = useSelector((store) => store.auth);


		if (auth.session) {
            router.push('/home')
        }else{
            expoRouter.dismissAll()
        }
	// 		// router.replace('/home')

	// 	// } else {
	// 	// 	return (
	// 	// 		<Stack>
	// 	// 			<Stack.Screen name="index" options={{ headerShown: false }} />
	// 	// 			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
	// 	// 		</Stack>
	// 	// 	);
	// 	// }
	// }
	return (
		<Stack>
			{auth.session ? (
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			) : (
				<>
					<Stack.Screen
						name="index"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(auth)"
						options={{ headerShown: false }}
					/>
				</>
			)}
			{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />; */}
		</Stack>
	);
}
