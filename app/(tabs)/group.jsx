import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";

const GroupInfo = () => {
  const [members, setMembers] = useState([
    { name: "Susan", selected: false },
    { name: "Ayan", selected: false },
    { name: "Ali", selected: false },
    { name: "Kyle", selected: false },
    { name: "Aden", selected: false },
    { name: "Mahamud", selected: false },
    { name: "Zakariya", selected: false },
    { name: "Ismail", selected: false },
    { name: "Ezra", selected: false },
  ]);

  const [currentMember, setCurrentMember] = useState(null);
  const [nextMember, setNextMember] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const unselected = members.filter((member) => !member.selected);
      if (unselected.length >= 2) {
        const shuffled = [...unselected].sort(() => Math.random() - 0.5);
        const selectedCurrent = shuffled[0].name;
        const selectedNext = shuffled[1].name;

        setCurrentMember(selectedCurrent);
        setNextMember(selectedNext);

        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.name === selectedCurrent || member.name === selectedNext
              ? { ...member, selected: true }
              : member
          )
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [members]);

  return (
    <SafeAreaView className="flex-1 bg-[#006B61] px-4">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 16 }}>
        {/* Logo */}
        <Image
          source={{ uri: "https://via.placeholder.com/130x45" }} // Replace with your logo
          className="w-32 h-12 mt-6 mb-4"
          resizeMode="contain"
        />

        {/* Group Card */}
        <View className="bg-white-200 p-4 rounded-lg w-full max-w-xs shadow-md mb-4">
          <Text className="text-lg font-bold text-center mb-2">Group: Mahamud's Group</Text>
          <Text className="text-base text-center text-gray-700 mb-2">Amount: $50</Text>
          <Text className="text-base text-center text-gray-700 mb-4">Due: 09/15/24</Text>

          {/* Circle Visualization */}
          <View className="relative w-[230px] h-[230px] rounded-full border-2 border-gray-300 bg-gray-100 self-center mb-4 flex justify-center items-center">
            <Text className="absolute text-lg font-bold text-yellow-500">
              {currentMember || "N/A"}
            </Text>
            {members.map((member, index) => {
              const angle = (index / members.length) * 2 * Math.PI;
              const radius = 85;

              return (
                <Text
                  key={index}
                  className={`absolute ${
                    member.name === currentMember
                      ? "text-yellow-500 font-bold"
                      : member.name === nextMember
                      ? "text-blue-500 font-bold"
                      : "text-gray-600"
                  }`}
                  style={{
                    transform: [
                      { translateX: radius * Math.cos(angle) },
                      { translateY: radius * Math.sin(angle) },
                    ],
                    left: "45%",
                    top: "45%",
                  }}
                >
                  {member.name}
                </Text>
              );
            })}
          </View>

          {/* Dropdown for Member Details */}
          <TouchableOpacity
            className="py-4 bg-yellow-500 rounded-lg"
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text className="text-center text-white font-bold">View Members</Text>
          </TouchableOpacity>

          {dropdownOpen && (
            <View className="bg-gray-100 p-4 mt-4 rounded-lg">
              <Text className="text-lg font-bold text-center mb-4">Group Members</Text>
              <FlatList
                data={members}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <View
                    className={`p-3 rounded-lg flex-row justify-between mb-2 ${
                      item.selected ? "bg-green-100" : "bg-white"
                    }`}
                  >
                    <Text className="text-sm font-bold">{item.name}</Text>
                    {item.selected && <Text className="text-green-600 font-bold">✓ Selected</Text>}
                  </View>
                )}
              />
              <Text className="text-base text-gray-700 mt-4">
                <Text className="font-bold text-yellow-500">Current: </Text>
                {currentMember || "N/A"}
              </Text>
              <Text className="text-base text-gray-700 mt-2">
                <Text className="font-bold text-blue-500">Next: </Text>
                {nextMember || "N/A"}
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                className="mt-4 py-3 bg-red-500 rounded-lg"
                onPress={() => setDropdownOpen(false)}
              >
                <Text className="text-center text-white font-bold">Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupInfo;
