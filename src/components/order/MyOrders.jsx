import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import firebase from '../../../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SecondaryHeader from '../navigation/SecondaryHeader'
import theme from '../../theme'
import Constants from "expo-constants"
import MyOrderStatusItem from './MyOrderStatusItem'

const MyOrders = (props) => {
    const {navigation} = props
    const [userId, setUserId] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(firebase.auth, (user) => {
            if(user != null){
                setUserId(user.uid)
            }
        })
        if(userId != null && orders.length == 0){
            getOrders(userId)
        }

    }, [userId])

    const getOrders = async (id) => {
        try{
            const q = query(collection(firebase.db, 'orders'), where('client', '==', id), orderBy("createdDate", "desc"));
            const querySnapshot = await getDocs(q);
            let orders = []
            querySnapshot.forEach((doc) => {
                const {orderId, status} = doc.data();
                orders.push({id: doc.id, orderId: orderId, status: status})
            })
            if(orders.length > 0){
                setLoading(false)
                setOrders(orders)
            }
        } catch (e) {
            console.log('Error al obtener los pedidos: ', e)
        }
    }
    
  return (
    <View style={styles.container}>
      <SecondaryHeader title={"Mis pedidos"} navigation={navigation} />
      <View style={[styles.body, {height: 'auto'}]}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <FlatList
            data={orders}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
                <MyOrderStatusItem status={item.status} orderId={item.orderId}/>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  )
}

export default MyOrders

const styles = {
    container: {marginTop: Constants.statusBarHeight, justifyContent: 'center', alignItems: 'center', flex: 1},
    body: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 50,
      },
}