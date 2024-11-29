import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image } from "../../constants"; 
import CustomButton from "../../components/CustomButton/CustomButton"; 

const Create = () => {
	const [members, setMembers] = useState([{ id: 1, phone: "" }]);
	const [groupName, setGroupName] = useState("");
	const [amount, setAmount] = useState("");
	const [frequency, setFrequency] = useState("");

	// Function to add more member fields
	const addMember = () => {
		const newId = members.length + 1;
		setMembers([...members, { id: newId, phone: "" }]);
	};

  // Function to remove the last member field
	const removeMember = () => {
		if (members.length > 1) {
			setMembers(members.slice(0, -1)); // Remove the last member
		}
	};


	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center px-6 mt-6">
					{/* Logo */}
					<Image
						source={image.logo} // Replace with your logo
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
						placeholder="Kaayo"
						value={frequency}
						onChangeText={setFrequency}
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
								className="bg-white-100 flex-1  p-3 rounded-md font-pregular text-base"
							/>
						</View>
					))}

{/* Add and Remove Members Buttons */}
<View className="flex-row justify-between items-center mt-5">
	{/* Add More Members Button */}
	<TouchableOpacity
		onPress={addMember}
		className="flex-row items-center gap-2"
	>
		<Text className="text-white-100 font-psemibold">
			Add More
		</Text>
		<View className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
			<Text className="text-white-100 text-lg">+</Text>
		</View>
	</TouchableOpacity>

	{/* Remove Member Button */}
	<TouchableOpacity
		onPress={removeMember}
		className="flex-row items-center gap-2"
	>
		<View className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
			<Text className="text-white-100 text-lg">-</Text>
		</View>
		<Text className="text-white-100 font-psemibold">
			Add Less
		</Text>
	</TouchableOpacity>
</View>



					{/* Invite Button */}
					<CustomButton
						title="Invite"
						handlePress={() => console.log("Invited!")}
						containerStyles="m-10 "
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
