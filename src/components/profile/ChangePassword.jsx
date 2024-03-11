import { Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants'
import React from 'react'
import SecondaryHeader from '../navigation/SecondaryHeader'
import CustomInput from '../formComponents/CustomInput'
import theme from '../../theme'

const ChangePassword = () => {
    const handleRegistrationButton = () => {
        console.log('Password updating...')
    }
  return (
    <View style={styles.container}>
        <SecondaryHeader title={"Datos personales"} save={false}/>
        <View>
            <CustomInput placeholder={"Contraseña actual"} secureTextEntry={true}/>
            <CustomInput placeholder={"Contraseña nueva"} secureTextEntry={true}/>
            <CustomInput placeholder={"Confirmar contraseña nueva"} secureTextEntry={true}/>
        </View>
      <View style={[theme.footer]}>
          <TouchableOpacity
            style={theme.darkButton}
            onPress={handleRegistrationButton}
          >
            <Text style={theme.buttonText}>Actualizar contraseña</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = {
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        justifyContent: "space-between",
    },
}

export default ChangePassword
