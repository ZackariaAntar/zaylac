import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { chooseFirst, chooseNext } from "../../redux/thunks/groupThunk";

export default function Randomizer({ members, group_id }) {
	const dispatch = useDispatch();
	console.log("MEMBERS", members);

	const [chosen, setChosen] = useState({});
	const [next, setNext] = useState({});

	const randomSelection = (members) => {
		const randomIndex = Math.floor(Math.random() * members.length);
		setChosen(members[randomIndex]);
	};
	const nextUp = () => {
		let filter = members.filter((member) => member.id !== chosen.id);
		console.log("filter", filter);
		const randomIndex = Math.floor(Math.random() * filter.length);
		setNext(filter[randomIndex]);

		dispatch(chooseNext(filter[randomIndex].id, group_id));
	};
	const handleConfirmChosen = () => {
		console.log("chosenID", chosen.id, "groupID", group_id);
		dispatch(chooseFirst(chosen.id, group_id));
		nextUp();
	};
	useEffect(() => {
		chosen.id && alert();
	}, [chosen.id]);

	const alert = () => {
		return Alert.alert(
			`${chosen.first_name} ${chosen.last_name}`,
			`Has been chosen to be the next member paid`,
			[
				{
					text: "Confirm",
					onPress: () => handleConfirmChosen(),
					style: "default",
				},
				{
					text: "Cancel",
					onPress: () => console.log("Cancel"),
					style: "cancel",
				},
			]
		);
	};

	return (
		<TouchableOpacity
			className="py-4 bg-yellow-500 rounded-lg"
			onPress={() => randomSelection(members)}
		>
			<Text className="text-center text-white font-bold">
				Choose a person
			</Text>
		</TouchableOpacity>
	);
}
