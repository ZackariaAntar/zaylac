import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/solid';

const Profile = () => {
  // State for inputs
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for cards
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Add Card
  const handleAddCard = () => {
    if (newCard.trim() === '') {
      Alert.alert('Error', 'Please enter a valid card number');
      return;
    }
    setCards([...cards, newCard]);
    setNewCard('');
    setIsAddingCard(false);
  };

  // Remove Card
  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  // Logout Action
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  return (
    <View className="flex-1 bg-teal-700">
      {/* Logout Icon */}
      <View className="flex-row justify-end p-4">
        <TouchableOpacity onPress={handleLogout}>
          <ArrowRightOnRectangleIcon size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Account Info Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white-100 text-xl font-bold">Account Info</Text>
        </View>

        {/* Account Info Fields */}
        <View className="bg-teal-800 p-4 rounded-lg mb-6">
          <Text className="text-white-100 text-lg  mb-1">Username</Text>
          <TextInput
            className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-4"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%]">
              <Text className="text-white-100 text-lg   mb-1">First Name</Text>
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
              />
            </View>

            <View className="w-[48%]">
              <Text className="text-white-100 text-lg mb-1">Last Name</Text>
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
              />
            </View>
          </View>

          <Text className="text-white-100 text-lg  mb-1">Email</Text>
          <TextInput
            className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
          />

          <Text className="text-white-100 text-lg mb-1">Phone Number</Text>
          <TextInput
            className="bg-gray-100 text-gray-900 px-3 py-2 rounded"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
          />
        </View>

        {/* Payment Methods Section */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Payment methods</Text>
            <TouchableOpacity onPress={() => setIsAddingCard(!isAddingCard)}>
              <PlusCircleIcon size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Add Card Input */}
          {isAddingCard && (
            <View className="mb-4">
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                value={newCard}
                onChangeText={setNewCard}
                placeholder="Enter card number"
              />
              <TouchableOpacity
                className="bg-teal-600 py-2 rounded items-center"
                onPress={handleAddCard}
              >
                <Text className="text-white font-bold">Add Card</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Payment Cards */}
          {cards.map((card, index) => (
            <View key={index} className="bg-gray-400 h-24 w-full rounded-lg relative mb-4 p-4">
              <Text className="text-white">Card {index + 1}: {card}</Text>
              <TouchableOpacity
                className="absolute bottom-2 right-2"
                onPress={() => handleRemoveCard(index)}
              >
                <MinusCircleIcon size={28} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
