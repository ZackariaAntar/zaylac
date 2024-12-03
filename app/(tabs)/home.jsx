import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  
} from "react-native";
import { useDispatch } from "react-redux";


const Home = () => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  // Fetch groups when the component loads
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        //we will Replace with the  API call
        const response = [
          { id: 1, name: "Zackariya Group", amount: "$50.00", dueDate: "2024-09-28", cycle: "2/10" },
          { id: 2, name: "Jano Group", amount: "$50.00", dueDate: "2024-09-26", cycle: "4/10" },
        ];
        setGroups(response); // Set fetched groups
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const renderGroup = ({ item }) => (
    <TouchableOpacity className="bg-white-100 font-pbold  rounded-2xl p-4 m-4 shadow">
      <Text className="text-xl font-semibold">{item.name}</Text>
      <Text className="text-base text-black mt-2">Amount: {item.amount}</Text>
      <Text className="text-base text-black mt-1">Due on: {item.dueDate}</Text>
      <Text className="text-sm text-green-700 font-medium text-right mt-2">
        Cycle: {item.cycle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary px-4 py-6">
      {/* Header */}
      <View className="items-center  mt-6 mb-6">
        <Text className="text-2xl m-2 p-2 text-white-100">Total Kaayo for this week</Text>
        <Text className="text-4xl font-bold text-white-100">$100.00</Text>
      </View>

      {/* Groups List */}
      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

    
    </SafeAreaView>
  );
};

export default Home;
