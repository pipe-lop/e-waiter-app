import { Text, Pressable } from 'react-native'
import React from 'react'
import theme from '../../theme'

const MyOrderButton = ({onPress}) => {
  return (
    <Pressable style={theme.redButton} onPress={onPress}>
      <Text style={theme.buttonText}>Mi pedido</Text>
    </Pressable>
  )
}

export default MyOrderButton

const styles = {}