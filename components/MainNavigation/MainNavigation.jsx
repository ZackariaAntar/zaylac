import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// SplashScreen.preventAutoHideAsync();
export default function MainNavigation(params) {

    useEffect(()=>{console.log('AUTH:', auth);
    },[])
	const auth = useSelector((store) => store.auth);

    if(auth.session){
        return (
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		);

    }else{
        return (
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack>
		);

    }
}
