import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  // Verificar token al iniciar
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Main');
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (username && password) {
      // Simulación de login
      await AsyncStorage.setItem('user', username);
      await AsyncStorage.setItem('token', 'fake-token-12345');

      setUser({ username });
      navigation.replace('Main');
    } else {
      alert('Por favor ingrese usuario y contraseña');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/cocinafondo.png')} // <-- imagen de fondo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image source={require('../../../assets/logoco.png')} style={styles.logo} />
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={[styles.input, { borderWidth: isFocused1 ? 3 : 1 }]}
            onChangeText={setUsername}
            value={username}
            placeholder="Nombre de usuario"
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
          />

          <TextInput
            style={[styles.input, { borderWidth: isFocused2 ? 3 : 1 }]}
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            secureTextEntry
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          
        </View>
      </View>
    </ImageBackground>
  );
};

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
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // blanco semitransparente
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#168700ff',
  },
  input: {
    height: 50,
    borderColor: '#168700ff',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#168700ff',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#168700ff',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
