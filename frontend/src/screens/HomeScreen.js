//importaciones
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//componente principal
const HomeScreen = () =>
{
  const [user, setUser] = useState('');
  const navigation = useNavigation();

  useEffect(() =>
  {
    const loadUser = async () =>
    {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser)
      {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () =>
  {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../../../assets/cocinafondo.png')} // fondo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}> 
          <Text style={styles.title}>Bienvenido {user}</Text>
          <Text style={styles.subtitle}>Registro de Recetas</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main', { screen: 'Perfil' })}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main', { screen: 'Ingresar recetas' })}
          >
            <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
            <Text style={styles.buttonText}>Ingreso de Recetas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Main', { screen: 'Lista de recetas' })}>
            <MaterialCommunityIcons name="clipboard" size={24} color="#fff" />
            <Text style={styles.buttonText}>Lista de recetas</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#fff" />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

//estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', // leve capa blanca sobre fondo
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // cuadro blanco translúcido
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#168700ff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#168700ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '90%',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#168700ff',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '90%',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#e74c3c',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default HomeScreen;
