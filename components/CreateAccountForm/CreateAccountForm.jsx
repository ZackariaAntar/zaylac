import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../FormField/FormField";
import CustomButton from "../CustomButton/CustomButton";

import { createUserProfile } from "../../redux/thunks/userThunk";

export default function CreateAccountForm({}) {
	const dispatch = useDispatch();
	const auth = useSelector((store) => store.auth);

	const profileData = {
		username: "",
		user_id: auth.id,
		first_name: "",
		last_name: "",
		phone_number: "",
		email: auth.email,
		city: "",
		country: "",
		gender_identity: "",
	};

	const [form, setForm] = useState(profileData);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(true);
		console.log("FORM", form);
		dispatch(createUserProfile(form));
		cleanUp();
	};

	const cleanUp = () => {
		setIsLoading(false);
		setForm(profileData);
	};

	const canSubmit = () => {
		let disabled = true;
		if (
			Object.values(form).every(
				(value) => value !== undefined && value !== null && value !== ""
			)
		) {
			disabled = false;
		}
		return disabled;
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingVertical: 50,
				backgroundColor: "#E8B931",
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{
					flex: 1,
					// paddingTop: 20,
					backgroundColor: "#E8B931",
				}}
			>
				<ScrollView
					style={{
						paddingHorizontal: 20,
						paddingTop: 30,
						backgroundColor: "#006B61",
						flexGrow: 1, // Allows ScrollView to take full height
					}}
					keyboardShouldPersistTaps="handled"
				>
					<FormField
						title={"Username"}
						value={form.username}
						placeholder={"Choose a username"}
						handleChangeText={(text) => {
							setForm({ ...form, username: text });
						}}
						otherStyles={null}
					/>
					<FormField
						title={"First Name"}
						value={form.first_name}
						placeholder={"What's your first name?"}
						handleChangeText={(text) => {
							setForm({ ...form, first_name: text });
						}}
						otherStyles={null}
					/>
					<FormField
						title={"Last Name"}
						value={form.last_name}
						placeholder={"What's your last name?"}
						handleChangeText={(text) => {
							setForm({ ...form, last_name: text });
						}}
						otherStyles={null}
					/>
					<FormField
						title={"Gender Identity"}
						value={form.gender_identity}
						placeholder={"What's your gender identity?"}
						handleChangeText={(text) => {
							setForm({ ...form, gender_identity: text });
						}}
						otherStyles={null}
					/>
					<FormField
						title={"Phone Number"}
						value={form.phone_number}
						placeholder={"(XXX) XXX-XXXX"}
						type={"phone-pad"}
						isMasked={true}
						maskType={"cel-phone"}
						maskOptions={{
							// maskType: "INTERNATIONAL",
							dddMask: "(999) 999-9999 ",
						}}
						handleChangeText={(text) => {
							setForm({ ...form, phone_number: text });

						}}
						otherStyles={null}
					/>
					<FormField
						title={"City"}
						value={form.city}
						placeholder={"What city do you live in?"}
						handleChangeText={(text) => {
							setForm({ ...form, city: text });
						}}
						otherStyles={null}
					/>
					<FormField
						title={"Country"}
						value={form.country}
						placeholder={"What country do you live in?"}
						handleChangeText={(text) => {
							setForm({ ...form, country: text });
						}}
						otherStyles={null}
					/>
					<CustomButton
						title={"Complete Profile"}
						otherStyles={{ marginBottom: 50 }}
						handlePress={handleSubmit}
						disabled={canSubmit()}
						isLoading={isLoading}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
