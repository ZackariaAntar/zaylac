import { View, Text } from 'react-native'
import React from 'react'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white-200 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16
                         px-4 bg-white-100 rounded-2xl focus:border-secondary
                        items-center
      ">
        <Text className="flex-1 text-white-200 font-psemibold text-base"
            value= {value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}

        />
      </View>
    </View>
  )
}

export default FormField