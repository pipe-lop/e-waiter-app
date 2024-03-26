import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Alert, View } from "react-native";
import firebase from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import SecondaryHeader from "../navigation/SecondaryHeader";
import UserAvatar from "react-native-user-avatar";
import CustomInput from "../formComponents/CustomInput";
import ProfileOption from "./ProfileOption";
import { deleteUser } from "firebase/auth";

const ProfileDetails = ({navigation}) => {
  const [save, setSave] = useState(false)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });
  const getUserExtended = async (userId) => {
    const docRef = doc(firebase.db, "users", userId);
    const data = await getDoc(docRef)
      .then((data) => {
        return data.data();
      })
      .catch((error) => console.log("getUserExtended", error));
    return data;
  };

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        getUserExtended(user.uid)
          .then((data) => {
            setUser({
              ...user,
              email: user.email,
              id: user.uid,
              firstName: data.firstName,
              lastName: data.lastName,
            });
          })
          .catch((error) => {
            console.log("useEffect", error);
          });
      }
    });
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
    setSave(true)
  };

  const updateUser = async () => {
    const userDoc = doc(firebase.db, "users", user.id)
    try{
        console.log(user.id)
        await updateDoc(userDoc, {
            firstName: user.firstName,
            lastName: user.lastName
        });
    }catch(error){
        Alert.alert("Se ha producido un error al actualizar al usuario")
        console.log(error)
    }finally{
        setSave(false)
    }
  }

  const onPressSave = () => {
    updateUser()
  }

  const onPress = (page, navigation) => {
    navigation.navigate(page);
  }

  const onDeleteUser = () => {
    console.log("voy a borrar....")
    Alert.alert("Atención", "Se va a eliminar la cuenta", [
      {
        text: 'Cancel',
        onPress: async() => console.log("Delete Account Canceled")
      },
      {
        text: 'Ok',
        onPress: async() => {
          try{
            await deleteUser(firebase.auth.currentUser).then( async() => {
              console.log("User deleted...")
              await deleteDoc(doc(firebase.db, "users", user.id))
              .then(() => console.log("User info deleted"))
              .catch((error) => console.log(error))
            })
          }catch(error) {
            console.log(error)
          }
        }
      }
    ]);
   
  }

  return (
    <View style={styles.container}>
      <SecondaryHeader
        style={styles.header}
        title={"Datos Personales"}
        save={save}
        onPress={() => {
            onPressSave()
        }}
      />
      <View style={styles.row}>
        <UserAvatar
          size={200}
          style={styles.avatar}
          bgColor="#101B1C"
          name={"Andres"}
        />
      </View>
      <View style={styles.options}>
        <CustomInput
          name={"Nombre"}
          value={user.firstName}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Apellidos"}
          value={user.lastName}
          onChangeHandler={(value) => handleChangeText("lastName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Email"}
          value={user.email}
          secureTextEntry={false}
          editable={false}
        />
      </View>
      <View style={styles.options}>
        <ProfileOption navigation={navigation} title="Cambiar contraseña" onPressAction={() => onPress("ChangePassword",navigation)}/>
        <ProfileOption navigation={navigation} title="Eliminar mi cuenta" onPressAction={() => onDeleteUser(user)}/>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 60,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  options: {
    width: "100%",
    marginBottom: 70,
  },
};

export default ProfileDetails;
