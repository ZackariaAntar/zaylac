import React, { useEffect, useState } from "react";
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
import { createGroup } from "../../redux/thunks/groupThunk";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

const Create = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const formData = {
		user_table_id: user.id,
		name: "",
		payment_amount: "",
		cycle_frequency: "",
		payment_day_of_week: "",
	};
	const [groupForm, setGroupForm] = useState(formData);

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
			const response = await fetch(
				"https://your-backend-api.com/invite",
				{
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
				}
			);

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
	const handleChangeText = (text, target) => {
		// Need to fix, can't have group names with numbers in them.
		let value
		const isNumbers = /\d/;
		if(isNumbers.test(text)){
			value = text*1
		}else{
			value = text
		}
		setGroupForm({ ...groupForm, [target]: value});
	};

	const handleSubmitGroup = () => {
		const {
			user_table_id,
			name,
			payment_amount,
			cycle_frequency,
			payment_day_of_week,
		} = groupForm;
		const payload = { ...groupForm, members: members };

		console.log("PAYLOAD", payload);

		dispatch(createGroup(payload));
	};
	useEffect(() => {
		console.log("groupForm", groupForm);
	}, [groupForm]);

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
						value={groupForm.name}
						onChangeText={(text) => {
							handleChangeText(text, "name");
						}}
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Amount */}
					<TextInput
						placeholder="$"
						value={groupForm.payment_amount}
						onChangeText={(text) => {
							handleChangeText(text, "payment_amount");
						}}
						keyboardType="numeric"
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/>

					{/* Frequency */}
					<View className="my-5">
						<Text>Payment Cycle (Daily, Weekly, etc.)</Text>
						<Picker
							selectedValue={groupForm.cycle_frequency}
							onValueChange={(itemValue, itemIndex) =>
								handleChangeText(itemValue, "cycle_frequency")
							}
							itemStyle={{ color: "#fff" }}

						>
							<Picker.Item label="Daily" value={1} />
							<Picker.Item label="Weekly" value={2} />
							<Picker.Item label="Monthly" value={3} />
						</Picker>
					</View>

					{/* Payment Day of the Week */}
					<View className="my-5">
						<Text>Payment Day of the Week</Text>

						<Picker
							selectedValue={groupForm.payment_day_of_week}
							onValueChange={(itemValue, itemIndex) =>
								handleChangeText(
									itemValue,
									"payment_day_of_week"
								)
							}
							itemStyle={{ color: "#fff" }}
						>
							<Picker.Item label="Monday" value={1} />
							<Picker.Item label="Tuesday" value={2} />
							<Picker.Item label="Wednesday" value={3} />
							<Picker.Item label="Thursday" value={4} />
							<Picker.Item label="Friday" value={5} />
							<Picker.Item label="Saturday" value={6} />
							<Picker.Item label="Sunday" value={7} />
						</Picker>
					</View>
					{/* <TextInput
						placeholder="What day of the week?"
						value={groupForm.payment_day_of_week}
						onChangeText={(text) => {
							handleChangeText(text, "payment_day_of_week");
						}}
						className="bg-white-100 p-3 rounded-md mt-5 font-pregular text-base w-[70%] mx-auto"
					/> */}

					{/* Members */}
					{members.map((member, index) => (
						<View
							key={member.id}
							className="flex-row items-center gap-2 mt-3 w-[80%] mx-auto"
						>
							<Text className="bg-blue-100 p-4 rounded-md text-white-100 w-12 text-center">
								{index + 1}
							</Text>
							{/* change to be phone number masked like in profile form */}
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
							<Text className="text-white-100 font-psemibold">
								Add More
							</Text>
							<View className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
								<Text className="text-white-100 text-lg">
									+
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={removeMember}
							className="flex-row items-center gap-2"
						>
							<View className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
								<Text className="text-white-100 text-lg">
									-
								</Text>
							</View>
							<Text className="text-white-100 font-psemibold">
								Remove
							</Text>
						</TouchableOpacity>
					</View>

					{/* Invite Button */}
					<CustomButton
						title="Invite"
						handlePress={handleSubmitGroup}
						containerStyles="mt-6"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
