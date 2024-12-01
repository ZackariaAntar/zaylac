import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/solid';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { clearAuthData } from '../../redux/slices/authSlice'; // Import Redux actions
import { logout } from '../../redux/thunks/authThunk'; // Import Redux thunks

const Profile = () => {
  const dispatch = useDispatch(); // Initialize dispatch

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
  const [editingCardIndex, setEditingCardIndex] = useState(null); // Track index of card being edited

  // Save or Edit action for user info
  const handleSaveOrEdit = () => {
    setIsEditing(!isEditing);
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
  };

  // Save Edited Card
  const handleSaveCard = (index) => {
    if (!cards[index].name || !cards[index].number || !cards[index].expiry || !cards[index].ccv) {
      Alert.alert('Error', 'All fields must be filled out.');
      return;
    }
    setEditingCardIndex(null); // Exit edit mode
  };

  // Update Card During Edit
  const handleEditCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setCards(updatedCards);
  };

  // Remove Card
  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    if (editingCardIndex === index) {
      setEditingCardIndex(null); // Exit edit mode if the card being edited is removed
    }
  };

  // Logout Handler with Confirmation
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout()); // Dispatch the logout thunk
          dispatch(clearAuthData()); // Clear auth data from Redux store
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Logout Icon */}
      <View className="flex-row font- pbold justify-end mt-3 p-4">
        <TouchableOpacity onPress={handleLogout}>
          <ArrowRightOnRectangleIcon size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Account Info Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white-100 font-pbold text-xl font-bold">Account Info</Text>
          <TouchableOpacity
            className="bg-blue-400 px-3 py-1 rounded"
            onPress={handleSaveOrEdit}
          >
            <Text className="text-white font-pbold text-md">{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info Fields */}
        <View className=" m-4 bg-teal-700 p-2 rounded-lg">
          <Text className="font-pbold text-white-100 text-md mb-1">Username</Text>
          <TextInput
            className={`bg-gray-100 w-[85%] text-lg text-gray-900 px-3 py-2 rounded mb-4 ${
              isEditing ? '' : 'opacity-50'
            }`}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            editable={isEditing}
          />

          <View className="flex-row justify-between mb-2">
            <View className="w-[48%]">
              <Text className=" font-pbold text-white-100 text-md mb-1">First Name</Text>
              <TextInput
                className={`bg-gray-100 text-lg text-gray-900 px-1 py-2 rounded ${
                  isEditing ? '' : 'opacity-50'
                }`}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                editable={isEditing}
              />
            </View>

            <View className="w-[48%]">
              <Text className="font-pbold text-white-100 text-md mb-1">Last Name</Text>
              <TextInput
                className={`bg-gray-100 text-lg  text-gray-900 px-3 py-2 rounded ${
                  isEditing ? '' : 'opacity-50'
                }`}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                editable={isEditing}
              />
            </View>
          </View>

          <Text className="font-pbold text-white-100 text-md mb-1">Email</Text>
          <TextInput
            className={`w-[85%] bg-gray-100 text-lg text-gray-900 px-3 py-2 rounded mb-4 ${
              isEditing ? '' : 'opacity-50'
            }`}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            editable={isEditing}
          />

          <Text className="font-pbold text-white-100 text-md mb-1">Phone Number</Text>
          <TextInput
            className={`w-[85%] bg-gray-100 text-gray-900 text-lg px-3 py-2 rounded ${
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
            <Text className="text-white-100 text-xl font-bold">Payment Methods</Text>
            <TouchableOpacity onPress={() => setIsAddingCard(!isAddingCard)}>
              <PlusCircleIcon size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Add Card Input */}
          {isAddingCard && (
            <View className="m-4 bg-teal-700 p-8 rounded-lg">
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
                className="bg-secondary-100 py-2 rounded items-center"
                onPress={handleAddCard}
              >
                <Text className="text-white font-pbold">Add Card</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Payment Cards */}
          {cards.map((card, index) => (
            <View key={index} className="bg-gray-400 h-auto w-full rounded-lg relative mb-4 p-4">
              {editingCardIndex === index ? (
                <>
                  <TextInput
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                    value={card.name}
                    onChangeText={(text) => handleEditCardChange(index, 'name', text)}
                    placeholder="Name on Card"
                  />
                  <TextInput
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                    value={card.number}
                    onChangeText={(text) => handleEditCardChange(index, 'number', text)}
                    placeholder="Card Number"
                    keyboardType="numeric"
                  />
                  <TextInput
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                    value={card.expiry}
                    onChangeText={(text) => handleEditCardChange(index, 'expiry', text)}
                    placeholder="Expiry Date (MM/YY)"
                    keyboardType="numeric"
                  />
                  <TextInput
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded mb-2"
                    value={card.ccv}
                    onChangeText={(text) => handleEditCardChange(index, 'ccv', text)}
                    placeholder="CCV"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    className="bg-secondary-100 py-2 rounded items-center"
                    onPress={() => handleSaveCard(index)}
                  >
                    <Text className="text-white font-pbold">Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text className="text-white-100 text-lg mb-1">{card.name}</Text>
                  <Text className="text-white-100 text-lg mb-1">**** **** **** {card.number.slice(-4)}</Text>
                  <Text className="text-white-100 text-lg mb-1">{card.expiry}</Text>
                  <View className="flex-row justify-between">
                    <TouchableOpacity
                      className="bg-secondary-100 py-2 rounded px-4 items-center"
                      onPress={() => setEditingCardIndex(index)}
                    >
                      <Text className="text-white font-pbold">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-600 py-2 rounded px-4 items-center"
                      onPress={() => handleRemoveCard(index)}
                    >
                      <Text className="text-white font-pbold">Remove</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
