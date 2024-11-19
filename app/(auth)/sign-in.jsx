import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import FormField from "../../components/FormField/FormField";
import { image } from "../../constants";

import CustomButton from "../../components/CustomButton/CustomButton";

import { signIn } from "../../redux/thunks/authThunk";
import { useDispatch } from "react-redux";

const SignIn = () => {
	const dispatch = useDispatch();

	const formData = { email: "", password: "" };
	const [form, setForm] = useState(formData);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = () => {
		setIsSubmitting(true);
		console.log("FORM DATA:", form);
		dispatch(signIn(form));
		setIsSubmitting(false);
		setForm(formData);
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 mt-6">
					<Image
						source={image.logo}
						className="w-[130px] h-[45px]"
						resizeMode="contain"
					/>
					<Text className="text-2xl text-white-100 text-semibold mt-10 font-psemibold">
						Log in to Kaayo
					</Text>

					<FormField
						title="Email"
						value={form.email}
						placeholder="Enter your email"
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						placeholder="Enter your password"
						handleChangeText={(e) =>
							setForm({ ...form, password: e })
						}
						otherStyles="mt-7"
						secureTextEntry
					/>

					<CustomButton
						title="Sign In"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-white-100 font-pregular">
							Don't have account
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-secondary"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
