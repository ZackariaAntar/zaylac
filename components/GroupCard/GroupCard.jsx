import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import Randomizer from "../../components/Randomizer/Randomizer";


export default function GroupCard({ group }) {
	console.log("GROUP", group);
	const { users } = group;
	const [currentMember, setCurrentMember] = useState({});
	const [nextMember, setNextMember] = useState({});
	const [dropdownOpen, setDropdownOpen] = useState(false);


    const hasBeenSelected = users.some((member) => member.is_current)
useEffect(()=>{
    const current = users.filter((member) => member.is_current === true);
    setCurrentMember(current[0])
    const next = users.filter((member) => member.is_next === true);
    setNextMember(next[0])
},[group])





	return (
		<View className="bg-white-200 p-4 rounded-lg w-full max-w-xs shadow-md mb-4">
			<Text style={{ fontSize: 20, fontWeight: 700 }}> {group.name}</Text>
			<Text style={{ fontSize: 20, fontWeight: 700 }}> {group.payment_amount}</Text>
			<Text style={{ fontSize: 20, fontWeight: 700 }}>Date: </Text>
			<View className="relative w-[230px] h-[230px] rounded-full border-2 border-gray-300 bg-gray-100 self-center mb-4 flex justify-center items-center">
				<Text className="absolute text-lg font-bold text-yellow-500">
					{currentMember.first_name || "N/A"}
				</Text>
				{users?.map((member, index) => {
					const angle = (index / users.length) * 2 * Math.PI;
					const radius = 85;

					return (
						<Text
							key={index}
							className={`absolute ${
								member.first_name === currentMember.first_name
									? "text-yellow-500 font-bold"
									: member.first_name === nextMember.first_name
									? "text-blue-500 font-bold"
									: "text-gray-600"
							}`}
							style={{
								transform: [
									{
										translateX: radius * Math.cos(angle),
									},
									{
										translateY: radius * Math.sin(angle),
									},
								],
								left: "45%",
								top: "45%",
							}}
						>
							{member.first_name}
						</Text>
					);
				})}
			</View>
            {!hasBeenSelected && <Randomizer members={users} group_id={group.id} />}
			<TouchableOpacity
				className="py-4 bg-yellow-500 rounded-lg"
				onPress={() => setDropdownOpen(!dropdownOpen)}
			>
				<Text className="text-center text-white font-bold">
					View Members
				</Text>
			</TouchableOpacity>
			{dropdownOpen && (
				<View className="bg-gray-100 p-4 mt-4 rounded-lg">
					<Text className="text-lg font-bold text-center mb-4">
						Group Members
					</Text>
					<FlatList
						data={users}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<View
								className={`p-3 rounded-lg flex-row justify-between mb-2 ${
									item.has_been_paid ? "bg-green-100" : "bg-white"
								}`}
							>
								<Text className="text-sm font-bold">
									{item.first_name}
								</Text>
								{item.has_been_paid && (
									<Text className="text-green-600 font-bold">
										✓ Paid
									</Text>
								)}
							</View>
						)}
					/>

					<Text className="text-base text-gray-700 mt-4">
						<Text className="font-bold text-yellow-500">
							Current:{" "}
						</Text>
						{currentMember?.first_name || "N/A"}
					</Text>
					<Text className="text-base text-gray-700 mt-2">
						<Text className="font-bold text-blue-500">Next: </Text>
						{nextMember?.first_name || "N/A"}
					</Text>

					{/* Close Button */}
					<TouchableOpacity
						className="mt-4 py-3 bg-red-500 rounded-lg"
						onPress={() => setDropdownOpen(false)}
					>
						<Text className="text-center text-white font-bold">
							Close
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
