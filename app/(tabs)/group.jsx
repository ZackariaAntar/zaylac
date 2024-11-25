import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { image } from "../../constants"; // Replace with your logo path

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
    // Randomly select current and next members
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
    }, 2000); // Simulate every 2 seconds for testing (replace with actual timing)

    return () => clearInterval(interval); // Cleanup
  }, [members]);

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 16 }}>
        {/* Logo */}
        <Image
          source={image.logo} // Replace with your logo path
          className="w-[130px] h-[45px]  mt-6 mb-4  self-center"
          resizeMode="contain"
        />

        {/* Parent Card */}
        <View className="bg-white-200 p-4 rounded-xl w-full max-w-[350px] shadow-md mb-4">
          <Text className="text-lg font-bold text-center mb-2">Group: Mahamud's Group</Text>
          <Text className="text-base text-center text-gray-700 mb-2">Amount: $50</Text>
          <Text className="text-base text-center text-gray-700 mb-4">Due: 09/15/24</Text>

          {/* Circle Visualization */}
          <View
  className="w-[230px] h-[230px] rounded-full border-2 border-gray-300 relative mx-auto mb-4 bg-gray-100 flex justify-center items-center"
>
  <Text className="absolute text-xl font-bold text-[#F5CB5C]">
    {currentMember || "N/A"}
  </Text>
  {members.map((member, index) => {
    const angle = (index / members.length) * 2 * Math.PI; // Calculate angle for each name
    const radius = 85; // Adjust radius
    const nameLength = member.name.length; // Consider name length for size adjustments
    const fontSize = nameLength > 6 ? 10 : 12; // Dynamically reduce font size for longer names

    return (
      <Text
        key={index}
        className={`absolute text-center ${
          member.name === currentMember
            ? "text-[#F5CB5C] font-bold"
            : member.name === nextMember
            ? "text-[#1D4ED8] font-bold"
            : "text-gray-600"
        }`}
        style={{
          fontSize, // Set dynamic font size
          transform: [
            { translateX: radius * Math.cos(angle) }, // X position
            { translateY: radius * Math.sin(angle) }, // Y position
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
            className="p-4 bg-[#F5CB5C] rounded-md"
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text className="text-center text-white font-bold">View Members</Text>
          </TouchableOpacity>

          {dropdownOpen && (
            <View className="bg-gray-100 p-4 mt-4 rounded-md">
              <Text className="text-lg font-bold text-center mb-4">Group Members</Text>
              <FlatList
                data={members}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <View
                    className={`p-4 rounded-md flex-row justify-between mb-2 ${
                      item.selected ? "bg-[#D1FAE5]" : "bg-white"
                    }`}
                  >
                    <Text className="text-base font-bold">{item.name}</Text>
                    {item.selected && (
                      <Text className="text-green-600 font-bold">✓ Selected</Text>
                    )}
                  </View>
                )}
              />
              <Text className="text-base text-gray-700 mt-4">
                <Text className="font-bold text-[#F5CB5C]">Current: </Text>
                {currentMember || "N/A"}
              </Text>
              <Text className="text-base text-gray-700 mt-2">
                <Text className="font-bold text-[#1D4ED8]">Next: </Text>
                {nextMember || "N/A"}
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                className="mt-4 p-3 bg-red-500 rounded-md"
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
