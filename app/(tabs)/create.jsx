import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { image } from "../../constants"; // Replace with your logo
import CustomButton from "../../components/CustomButton/CustomButton";

const Create = () => {
	const [members, setMembers] = useState([{ id: 1, phone: "" }]);
	const [groupName, setGroupName] = useState("");
	const [amount, setAmount] = useState("");
	const [frequency, setFrequency] = useState("");
	const [startDate, setStartDate] = useState("");
	const navigation = useNavigation();

	const addMember = () => {
		const newId = members.length + 1;
		setMembers([...members, { id: newId, phone: "" }]);
	};

	const removeMember = () => {
		if (members.length > 1) {
			setMembers(members.slice(0, -1));
		}
	};

	const generateInviteLink = async () => {
		if (!groupName || !amount || !frequency || !startDate) {
			alert("Please fill in all fields!");
			return;
		}

		try {
			// we will Replace with your backend API for generating invite links
			const response = await fetch("https://your-backend-api.com/invite", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					groupName,
					amount,
					frequency,
					startDate,
					members,
				}),
			});

			const data = await response.json();
			if (data.link) {
				navigation.navigate("ShareInvite", { link: data.link });
			} else {
				alert("Failed to generate invite link.");
			}
		} catch (error) {
			console.error(error);
			alert("Error generating invite link.");
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full px-6 mt-6">
					{/* Logo */}
					<Image
						source={image.logo}
						className="w-[130px] h-[45px]"
						resizeMode="contain"
					/>

					{/* Header */}
					<Text className="text-2xl text-white-100 text-semibold mt-5 font-psemibold">
						Create Group
					</Text>

					{/* Group Name */}
					<TextInput
						placeholder="Group Name"
						value={groupName}
						onChangeText={setGroupName}
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Amount */}
					<TextInput
						placeholder="$"
						value={amount}
						onChangeText={setAmount}
						keyboardType="numeric"
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Frequency */}
					<TextInput
						placeholder="Cycle (Daily, Weekly, etc.)"
						value={frequency}
						onChangeText={setFrequency}
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Start Date */}
					<TextInput
						placeholder="Start Date (YYYY-MM-DD)"
						value={startDate}
						onChangeText={setStartDate}
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Members */}
					{members.map((member, index) => (
						<View
							key={member.id}
							className="flex-row items-center gap-2 mt-3 w-[80%] mx-auto"
						>
							<Text className="bg-blue-100 p-4 rounded-md text-white-100 w-12 text-center">
								{index + 1}
							</Text>
							<TextInput
								placeholder="Member Number"
								value={member.phone}
								onChangeText={(text) => {
									const updatedMembers = [...members];
									updatedMembers[index].phone = text;
									setMembers(updatedMembers);
								}}
								keyboardType="phone-pad"
								className="bg-white-100 flex-1 p-3 rounded-md font-pregular text-base"
							/>
						</View>
					))}

					{/* Add/Remove Members */}
					<View className="flex-row justify-between items-center mt-5">
						<TouchableOpacity
							onPress={addMember}
							className="flex-row items-center gap-2"
						>
							<Text className="text-white-100 font-psemibold">Add More</Text>
							<View className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
								<Text className="text-white-100 text-lg">+</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={removeMember}
							className="flex-row items-center gap-2"
						>
							<View className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
								<Text className="text-white-100 text-lg">-</Text>
							</View>
							<Text className="text-white-100 font-psemibold">Remove</Text>
						</TouchableOpacity>
					</View>

					{/* Invite Button */}
					<CustomButton
						title="Invite"
						handlePress={generateInviteLink}
						containerStyles="mt-6"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
