import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    return (
        <TouchableOpacity className={`bg-secondary-100 rounded-xl text-white-100
            min-h-[62px] justify-center items-center
        `}>
        <Text className="text-black-200 font-psemibold">CustomButton</Text>
        </TouchableOpacity>
    )
    }

export default CustomButton;