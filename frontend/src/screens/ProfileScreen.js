import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Cargar usuario y tema al iniciar
  useEffect(() => {
    const loadData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUsername(storedUser);

      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      if (storedDarkMode !== null) setDarkMode(storedDarkMode === "true");
    };
    loadData();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", newValue.toString());
  };

  // Estilos
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "transparent",
    },
    card: {
      width: "90%",
      backgroundColor: darkMode
        ? "rgba(50, 50, 50, 0.95)"
        : "rgba(255, 255, 255, 0.92)",
      borderRadius: 20,
      padding: 25,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 6,
      alignItems: "center",
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    title: {
      fontSize: 28,
      marginVertical: 10,
      textAlign: "center",
      fontWeight: "bold",
      color: darkMode ? "#fff" : "#168700ff",
    },
    usernameText: {
      fontSize: 22,
      color: darkMode ? "#ddd" : "#333",
      marginVertical: 10,
      fontWeight: "600",
      textAlign: "center",
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    switchText: {
      marginRight: 10,
      fontSize: 16,
      color: darkMode ? "#fff" : "#333",
    },
  });

  return (
    <ImageBackground
      source={require("../../../assets/cocinafondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/logoco.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Perfil de Usuario</Text>
          <Text style={styles.usernameText}>
            {username ? username : "Usuario no registrado"}
          </Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Modo Oscuro</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
