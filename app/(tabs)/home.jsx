import { View, Text, Button } from 'react-native'
import React from 'react'
import { clearAuthData } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/thunks/authThunk';



const Home = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <Text
      onPress={()=>{
        dispatch(clearAuthData())
      }}
      >Home</Text>
      <Button
      title='Log out'
      onPress={()=>{
        dispatch(logout())
      }}

      />

    </View>
  )
}

export default Home