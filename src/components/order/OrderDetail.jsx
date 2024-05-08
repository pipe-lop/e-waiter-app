import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import firebase from '../../../database/firebase'
import theme from '../../theme'

const OrderDetail = (props) => {
    const {navigation, route} = props

    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState({
        id:"",
        orderId: 0,
        inSite: true,
        items: [],
        status: "",
        totalAmount: 0.0,
        createdDate: "",
        updatedDate: ""
    })
    
    useEffect(() => {
      if(route.params.id != null){
        getOrderDetail()
      }
    }, [])

    const getOrderDetail = async() => {
        try{
            const docRef = doc(firebase.db, 'orders', route.params.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                setOrder({
                    id: docSnap.id,
                    orderId: docSnap.data().orderId,
                    inSite: docSnap.data().inSite,
                    items: docSnap.data().items,
                    status: docSnap.data().status,
                    totalAmount: docSnap.data().totalAmount,
                    createdDate: docSnap.data().createdDate,
                    updatedDate: docSnap.data().updateDate
                })
                setLoading(false)
            }
        }catch (e) {
            console.log("Error al obtener el detalle del pedido: ", e)
        }
    }
    
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        { loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
            <Text>Pedido: {order.orderId}</Text>
        )}
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({})