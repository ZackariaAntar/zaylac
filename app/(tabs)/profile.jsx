import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/solid';

const Profile = () => {
  // State for user info
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for edit/save button
  const [isEditing, setIsEditing] = useState(true);

  // State for payment cards
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ name: '', number: '', expiry: '', ccv: '' });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [hasCards, setHasCards] = useState(false); // New state for tracking if cards are added

  // Save or Edit action
  const handleSaveOrEdit = () => {
    if (isEditing) {
      // Switch to view mode
      setIsEditing(false);
    } else {
      // Switch to edit mode
      setIsEditing(true);
    }
  };

  // Add Card
  const handleAddCard = () => {
    if (
      !newCard.name.trim() ||
      !newCard.number.trim() ||
      !newCard.expiry.trim() ||
      !newCard.ccv.trim()
    ) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }
    setCards([...cards, newCard]);
    setNewCard({ name: '', number: '', expiry: '', ccv: '' });
    setIsAddingCard(false);
    setHasCards(true); // Set hasCards to true after adding a card
  };

  // Remove Card
  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    if (updatedCards.length === 0) {
      setHasCards(false); // Reset hasCards to false if no cards remain
    }
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
          <Text className="text-white text-xl font-bold">Account Info</Text>
          <TouchableOpacity
            className="bg-teal-600 px-3 py-1 rounded"
            onPress={handleSaveOrEdit}
          >
            <Text className="text-white text-sm">{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info Fields */}
        <View className="bg-teal-800 p-4 rounded-lg mb-6">
          <Text className="text-white-100 text-lg mb-1">Username</Text>
          <TextInput
            className={`bg-gray-100 text-gray-900 px-3 py-2 rounded mb-4 ${
              isEditing ? '' : 'opacity-50'
            }`}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            editable={isEditing}
          />

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%]">
              <Text className="text-white-100 text-lg mb-1">First Name</Text>
              <TextInput
                className={`bg-gray-100 text-gray-900 px-3 py-2 rounded ${
                  isEditing ? '' : 'opacity-50'
                }`}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                editable={isEditing}
              />
            </View>

            <View className="w-[48%]">
              <Text className="text-white-100 text-lg mb-1">Last Name</Text>
              <TextInput
                className={`bg-gray-100 text-gray-900 px-3 py-2 rounded ${
                  isEditing ? '' : 'opacity-50'
                }`}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                editable={isEditing}
              />
            </View>
          </View>

          <Text className="text-white-100 text-lg mb-1">Email</Text>
          <TextInput
            className={`bg-gray-100 text-gray-900 px-3 py-2 rounded mb-4 ${
              isEditing ? '' : 'opacity-50'
            }`}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            editable={isEditing}
          />

          <Text className="text-white-100 text-lg mb-1">Phone Number</Text>
          <TextInput
            className={`bg-gray-100 text-gray-900 px-3 py-2 rounded ${
              isEditing ? '' : 'opacity-50'
            }`}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            editable={isEditing}
          />
        </View>

        {/* Payment Methods Section */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white-100 text-xl font-bold">Payment methods</Text>
            <TouchableOpacity onPress={() => setIsAddingCard(!isAddingCard)}>
              <PlusCircleIcon size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Add Card Input */}
          {isAddingCard && (
            <View className="mb-4 bg-teal-800 p-4 rounded-lg">
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                value={newCard.name}
                onChangeText={(text) => setNewCard({ ...newCard, name: text })}
                placeholder="Name on Card"
              />
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                value={newCard.number}
                onChangeText={(text) => setNewCard({ ...newCard, number: text })}
                placeholder="Card Number"
                keyboardType="numeric"
              />
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                value={newCard.expiry}
                onChangeText={(text) => setNewCard({ ...newCard, expiry: text })}
                placeholder="Expiry Date (MM/YY)"
                keyboardType="numeric"
              />
              <TextInput
                className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-4"
                value={newCard.ccv}
                onChangeText={(text) => setNewCard({ ...newCard, ccv: text })}
                placeholder="CCV"
                keyboardType="numeric"
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
            <View key={index} className="bg-gray-400 h-32 w-full rounded-lg relative mb-4 p-4">
              <Text className="text-white mb-1">Name: {card.name}</Text>
              <Text className="text-white mb-1">Number: {card.number}</Text>
              <Text className="text-white mb-1">Expiry: {card.expiry}</Text>
              <Text className="text-white mb-1">CCV: {card.ccv}</Text>
              <TouchableOpacity
                className="absolute bottom-2 right-2"
                onPress={() => handleRemoveCard(index)}
              >
                <MinusCircleIcon size={28} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Show Edit button if cards have been added */}
          {hasCards && (
            <TouchableOpacity
              className="bg-teal-600 py-2 rounded items-center mt-4"
              onPress={() => setIsEditing(true)} // You can define the action for the Edit button here
            >
              <Text className="text-white font-bold">Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
