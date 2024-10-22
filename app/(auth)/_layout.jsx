import { View, Text } from 'react-native'
import React from 'react'
import {  Stack} from "expo-router";

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen
                name="sign-in"
                opptions={{
                    headerShown:false
                }}
            />

<Stack.Screen
                name="sign-up"
                opptions={{
                    headerShown:false
                }}
            />
        </Stack>
    </>
  )
}

export default AuthLayout