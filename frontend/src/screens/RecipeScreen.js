import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Switch,
} from "react-native";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = SQLite.openDatabaseSync("recetas.db");

const App = () => {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar tema guardado
  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("darkMode");
      if (stored !== null) setDarkMode(stored === "true");
    };
    loadTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", newValue.toString());
  };

  // Crear tabla al iniciar
  useEffect(() => {
    const initDb = async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS recetas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          ingredientes TEXT,
          preparacion TEXT
        );
      `);
      loadRecetas();
    };
    initDb();
  }, []);

  // Cargar recetas
  const loadRecetas = async () => {
    const result = await db.getAllAsync("SELECT * FROM recetas");
    setRecetas(result);
  };

  // Agregar o editar receta
  const saveReceta = async () => {
    if (!nombre.trim() || !ingredientes.trim() || !preparacion.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      if (editingId) {
        await db.runAsync(
          "UPDATE recetas SET nombre = ?, ingredientes = ?, preparacion = ? WHERE id = ?",
          [nombre, ingredientes, preparacion, editingId]
        );
        Alert.alert("Éxito", "Receta actualizada correctamente.");
      } else {
        await db.runAsync(
          "INSERT INTO recetas (nombre, ingredientes, preparacion) VALUES (?, ?, ?)",
          [nombre, ingredientes, preparacion]
        );
        Alert.alert("Éxito", "Receta agregada correctamente.");
      }
      setNombre("");
      setIngredientes("");
      setPreparacion("");
      setEditingId(null);
      loadRecetas();
    } catch (error) {
      console.error("Error al agregar/editar receta:", error);
      Alert.alert("Error", error.message);
    }
  };

  // Editar receta
  const editReceta = (id) => {
    const receta = recetas.find((r) => r.id === id);
    if (receta) {
      setNombre(receta.nombre);
      setIngredientes(receta.ingredientes);
      setPreparacion(receta.preparacion);
      setEditingId(id);
    }
  };

  // Eliminar receta
  const deleteReceta = async (id) => {
    Alert.alert("Confirmar", "¿Seguro que deseas eliminar esta receta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM recetas WHERE id = ?", [id]);
          loadRecetas();
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../../assets/cocinafondo.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Capa de transparencia solo en modo oscuro */}
      {darkMode && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ ...styles.title, color: darkMode ? "#fff" : "#168700ff" }}>
          📖 Gestión de Recetas
        </Text>

        {/* Switch de Modo Oscuro */}
        <View style={styles.switchContainer}>
          <Text style={{ ...styles.switchText, color: darkMode ? "#fff" : "#333" }}>
            Modo Oscuro
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#fff",
            color: "#000",
            borderColor: darkMode ? "#555" : "#168700ff",
          }}
          placeholder="Nombre de la receta"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#fff",
            color: "#000",
            borderColor: darkMode ? "#555" : "#168700ff",
          }}
          placeholder="Ingredientes"
          value={ingredientes}
          onChangeText={setIngredientes}
        />

        <TextInput
          style={{
            ...styles.input,
            height: 80,
            backgroundColor: "#fff",
            color: "#000",
            borderColor: darkMode ? "#555" : "#168700ff",
          }}
          placeholder="Preparación"
          value={preparacion}
          onChangeText={setPreparacion}
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={saveReceta}>
          <Text style={styles.buttonText}>
            {editingId ? "Actualizar Receta" : "Agregar Receta"}
          </Text>
        </TouchableOpacity>

        <Text style={{ ...styles.counter, color: darkMode ? "#fff" : "#000" }}>
          Total de recetas: {recetas.length}
        </Text>

        {recetas.map((item) => (
          <View
            key={item.id}
            style={{
              ...styles.itemContainer,
              backgroundColor: "#fff", // tarjetas siempre blancas
            }}
          >
            <Text style={{ ...styles.itemTitle, color: darkMode ? "#168700ff" : "#168700ff" }}>
              {item.nombre}
            </Text>
            <Text style={{ ...styles.itemDesc, color: "#555" }}>
              <Text style={styles.bold}>Ingredientes:</Text> {item.ingredientes}
            </Text>
            <Text style={{ ...styles.itemDesc, color: "#555" }}>
              <Text style={styles.bold}>Preparación:</Text> {item.preparacion}
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editReceta(item.id)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteReceta(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  title: { fontSize: 30, margin: 20, textAlign: "center", fontWeight: "bold" },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "100%",
  },
  addButton: {
    width: "100%",
    backgroundColor: "#168700ff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  counter: { margin: 15, fontSize: 18, fontWeight: "bold" },
  itemContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  itemTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  itemDesc: { fontSize: 16, textAlign: "center", marginVertical: 5 },
  bold: { fontWeight: "bold" },
  buttonGroup: { flexDirection: "row", gap: 10, marginTop: 10 },
  editButton: {
    backgroundColor: "#f39c12",
    padding: 10,
    width: "40%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    width: "40%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  switchText: { marginRight: 10, fontSize: 16 },
});
