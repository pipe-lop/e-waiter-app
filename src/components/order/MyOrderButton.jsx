import { Text, Pressable } from 'react-native'
import React from 'react'
import theme from '../../theme'

const MyOrderButton = () => {
  return (
    <Pressable style={theme.redButton}>
      <Text style={theme.buttonText}>Mi pedido</Text>
    </Pressable>
  )
}

export default MyOrderButton

const styles = {}