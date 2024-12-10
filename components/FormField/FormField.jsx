import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

import {icons} from '../../constants'
import { TextInputMask } from "react-native-masked-text";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, type, isMasked, maskType, maskOptions, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
		// <KeyboardAvoidingView
		// behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
		// keyboardVerticalOffset={10}
		// >
		<View className={`space-y-2 ${otherStyles}`} style={otherStyles}>
			<Text className="text-base text-white-200 font-pmedium">
				{title}
			</Text>
			{isMasked ? (
				<View
					className="border-2 border-black-200 w-full h-16 px-4 bg-yellow-100
                            rounded-2xl focus:border-secondary items-center flex-row"
					style={{ marginVertical: 25 }}
				>
					<TextInputMask
						className="flex-1 text-black-100 font-psemibold text-base"
						placeholderTextColor="#7b7b8b"
						placeholder={placeholder}
						type={maskType}
						options={maskOptions}
						value={value}
						onChangeText={handleChangeText}
						style={{
							paddingVertical: 15,
						}}
					/>
					{/* <TextInput
						className="flex-1 text-black-100 font-psemibold text-base"
						value={value}
						placeholder={placeholder}
						placeholderTextColor="#7b7b8b"
						onChangeText={handleChangeText}
						secureTextEntry={title === "Password" && !showPassword}
						autoCapitalize="none"
						style={{
							paddingVertical: 15,
						}}
						keyboardType={type}
					/> */}
				</View>
			) : (
				<View
					className="border-2 border-black-200 w-full h-16 px-4 bg-yellow-100
                            rounded-2xl focus:border-secondary items-center flex-row"
					style={{ marginVertical: 25 }}
				>
					<TextInput
						className="flex-1 text-black-100 font-psemibold text-base"
						value={value}
						placeholder={placeholder}
						placeholderTextColor="#7b7b8b"
						onChangeText={handleChangeText}
						secureTextEntry={title === "Password" && !showPassword}
						autoCapitalize="none"
						style={{
							paddingVertical: 15,
						}}
						keyboardType={type}
					/>

					{title === "Password" && (
						<TouchableOpacity
							onPress={() => setShowPassword(!showPassword)}
						>
							<Image
								source={
									!showPassword ? icons.eye : icons.eyeHide
								}
								className="w-6 h-6"
								resizeMode="contain"
							/>
						</TouchableOpacity>
					)}
				</View>
			)}
		</View>
		// </KeyboardAvoidingView>
	);
};

export default FormField;
