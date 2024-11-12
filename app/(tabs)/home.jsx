import { View, Text } from 'react-native'
import React from 'react'
import { clearAuthData } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <Text
      onPress={()=>{
        dispatch(clearAuthData())
      }}
      >Home</Text>
    </View>
  )
}

export default Home