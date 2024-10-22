import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    return (
        <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        
        className={`bg-secondary-100 rounded-xl text-white-100
            min-h-[62px] justify-center items-center ${containerStyles}
            ${isLoading ? 'opocity-50':''}`}
            disabled={isLoading}
            
            >
        <Text className="text-black-200 font-psemibold">CustomButton</Text>
        </TouchableOpacity>
    )
    }

export default CustomButton;