import React, { useEffect, useState } from "react";
import { Modal, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../FormField/FormField";

export default function CreateAccountForm() {
const[ visible, setVisible] = useState(true)
	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
				setVisible(!visible);
			}}
		>
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
			<FormField />
		</Modal>
	);
}
