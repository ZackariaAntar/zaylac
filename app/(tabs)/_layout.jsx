import { View, Image, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../redux/store";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className="items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>

			<Text
				className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Tabs
					screenOptions={{
						tabBarShowLabel: false,
						tabBarActiveTintColor: "#FFA001",
						tabBarInactiveTintColor: "#CDCDE0",
						tabBarStyle: {
							backgroundColor: "#161622",
							borderTopWidth: 1,
							borderTopColor: "#232533",
							height: 70,
						},
					}}
				>
					<Tabs.Screen
						name="home"
						options={{
							title: "Home",
							headerShown: "false",
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.home}
									color={color}
									name="Home"
									focused={focused}
								/>
							),
						}}
					/>

					<Tabs.Screen
						name="create"
						options={{
							title: "Create",
							headerShown: "false",
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.plus}
									color={color}
									name="Create"
									focused={focused}
								/>
							),
						}}
					/>

					<Tabs.Screen
						name="group"
						options={{
							title: "Group",
							headerShown: "false",
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.search}
									color={color}
									name="Group"
									focused={focused}
								/>
							),
						}}
					/>

					<Tabs.Screen
						name="profile"
						options={{
							title: "Profile",
							headerShown: "false",
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.profile}
									color={color}
									name="Profile"
									focused={focused}
								/>
							),
						}}
					/>
				</Tabs>
			</PersistGate>
		</Provider>
	);
};

export default TabsLayout;
