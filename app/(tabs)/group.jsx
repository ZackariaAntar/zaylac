// import React, { useState } from "react";
// import { View, Text, Image, SafeAreaView } from "react-native";
// import { image } from "../../constants"; 

// const GroupInfo = () => {
//   const members = [
//     { id: 1, name: "Susan" },
//     { id: 2, name: "Ayan" },
//     { id: 3, name: "Ali" },
//     { id: 4, name: "Kyle" },
//     { id: 5, name: "Aden" },
//     { id: 6, name: "Mahamud" },
//     { id: 7, name: "Zakariya" },
//     { id: 8, name: "Ismail" },
//     { id: 9, name: "Ezra" },
//   ];

//   const nextMember = "Kyle";
//   const currentMember = "Ali";

//   // Function to calculate positioning around the circle
//   const calculatePosition = (index, total) => {
//     const angle = (index / total) * 2 * Math.PI; // Calculate angle for each member
//     const radius = 60; // Adjust radius for spacing
//     return {
//       top: `${50 + Math.sin(angle) * radius}%`,
//       left: `${50 + Math.cos(angle) * radius}%`,
//       position: "absolute",
//       transform: [{ translateX: -20 }, { translateY: 10 }], // Adjust to center the text
//     };
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#356859] items-center justify-center p-4">
//       {/* Logo */}
//       <Image
//         source={image.logo} // Replace with your logo
//         className="w-[130px] h-[45px] mb-8"
//         resizeMode="contain"
//       />

//       {/* Group Info */}
//       <View className="bg-white p-6 rounded-md w-full max-w-[300px] mb-14">
//         <Text className="text-xl text-center text-white-100">Name: Mahamud's Group</Text>
//         <Text className="text-xl text-center text-white-100">Amount: $50</Text>
//         <Text className="text-xl text-center text-white-100">Due: 09/15/24</Text>
//       </View>

//       {/* Members Wheel */}
//       <View className="w-[200px] h-[200px] rounded-full border-2 border-white relative">
//         {members.map((member, index) => {
//           const position = calculatePosition(index, members.length);
//           return (
//             <Text
//               key={member.id}
//               className={`text-white text-lg font-bold ${currentMember === member.name ? 'text-[#F5CB5C]' : nextMember === member.name ? 'text-[#1D4ED8]' : ''}`}
//               style={position}
//             >
//               {member.name}
//             </Text>
//           );
//         })}
//       </View>

//       {/* Status */}
//       <View className="mt-20 w-full max-w-[300px] flex-row justify-between">
//         <Text className="text-lg text-[#F5CB5C]">
//           <Text className="text-blue-500">Next:</Text> {nextMember}
//         </Text>
//         <Text className="text-lg text-[#F5CB5C]">
//           <Text className="text-yellow-500">Current:</Text> {currentMember}
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default GroupInfo;

import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

const GroupInfo = () => {
  const members = [
    "Susan",
    "Ayan",
    "Ali",
    "Kyle",
    "Aden",
    "Mahamud",
    "Zakariya",
    "Ismail",
    "Ezra",
  ];

  const currentMember = "Ali";
  const nextMember = "Kyle";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#356859",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {/* Group Info */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 8,
          width: "100%",
          maxWidth: 300,
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#000" }}>
          <Text style={{ fontWeight: "bold" }}>Group:</Text> Mahamud's Group
        </Text>
        <Text style={{ fontSize: 16, marginTop: 4 }}>Amount: $50</Text>
        <Text style={{ fontSize: 16, marginTop: 4 }}>Due: 09/15/24</Text>
      </View>

      {/* Members Wheel */}
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "#fff",
          position: "relative",
          marginBottom: 16,
        }}
      >
        {members.map((name, index) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              fontSize: 12,
              color: name === currentMember ? "#F5CB5C" : "#fff",
              transform: [
                { translateX: 80 * Math.cos((index / members.length) * 2 * Math.PI) },
                { translateY: 80 * Math.sin((index / members.length) * 2 * Math.PI) },
              ],
              left: "50%",
              top: "50%",
              textAlign: "center",
            }}
          >
            {name}
          </Text>
        ))}
      </View>

      {/* Members List */}
      <ScrollView
        style={{
          width: "100%",
          maxWidth: 300,
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Group Members
        </Text>
        {members.map((name, index) => (
          <Text
            key={index}
            style={{
              fontSize: 14,
              paddingVertical: 4,
              color: name === currentMember ? "#F5CB5C" : "#000",
            }}
          >
            {index + 1}. {name}
          </Text>
        ))}
      </ScrollView>

      {/* Current and Next */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Text style={{ fontSize: 16, color: "#F5CB5C" }}>
          <Text style={{ color: "#1D4ED8" }}>Next:</Text> {nextMember}
        </Text>
        <Text style={{ fontSize: 16, color: "#F5CB5C" }}>
          <Text style={{ color: "#F5CB5C" }}>Current:</Text> {currentMember}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GroupInfo;
