import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import PaymentItem from './PaymentItem'

const PressablePaymentItem = ({title, number, icon, selected, onSelect}) => {
  return (
    <Pressable onPress={onSelect}>
      <PaymentItem title={title} number={number} icon={icon} selected={selected}/>
    </Pressable>
  )
}

export default PressablePaymentItem

const styles = {}