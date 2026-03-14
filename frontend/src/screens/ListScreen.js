import React, { useEffect, useState } from "react";
import { Text, View, Switch, StyleSheet, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("recetas.db");

const ListScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [recetas, setRecetas] = useState([]);

  // Cargar tema guardado
  useEffect(() => {
    const loadSettings = async () => {
      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        setDarkMode(storedDarkMode === "true");
      }
    };
    loadSettings();
  }, []);

  // Cargar recetas desde SQLite
  useEffect(() => {
    const loadRecetas = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS recetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            ingredientes TEXT,
            preparacion TEXT
          );
        `);

        const result = await db.getAllAsync("SELECT * FROM recetas");
        setRecetas(result);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      }
    };
    loadRecetas();
  }, []);

  // Cambiar modo oscuro
  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", newValue.toString());
  };

  // Estilos dinámicos
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: darkMode ? "#fff" : "#168700ff",
    },
    recetaContainer: {
      backgroundColor: "#fff", // tarjetas siempre blancas
      padding: 15,
      borderRadius: 10,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    recetaTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
    },
    recetaText: {
      color: "#333",
      marginTop: 5,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginTop: 25,
      marginBottom: 10,
      color: darkMode ? "#fff" : "#168700ff",
      textAlign: "center",
    },
    switchContainer: { alignItems: "center", marginBottom: 20 },
    switchText: { fontSize: 16, marginBottom: 5, color: darkMode ? "#fff" : "#333" },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.6)", // transparencia solo en modo oscuro
    },
  });

  return (
    <ImageBackground
      source={require("../../../assets/cocinafondo.png")} //Fondo
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {darkMode && <View style={styles.overlay} />}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Lista de recetas</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Modo Oscuro</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <Text style={styles.sectionTitle}>Recetas Guardadas</Text>

        {recetas.length === 0 ? (
          <Text style={{ textAlign: "center", color: darkMode ? "#ccc" : "#666" }}>
            No hay recetas registradas aún.
          </Text>
        ) : (
          //Muetra listado de  recetas registradas mandando a traer nombres, ingredientes y descripcion con ids
          recetas.map((r) => (
            <View key={r.id} style={styles.recetaContainer}>
              <Text style={styles.recetaTitle}>{r.nombre}</Text>
              <Text style={styles.recetaText}>
                <Text style={{ fontWeight: "bold" }}>Ingredientes:</Text> {r.ingredientes}
              </Text>
              <Text style={styles.recetaText}>
                <Text style={{ fontWeight: "bold" }}>Preparación:</Text> {r.preparacion}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default ListScreen;
