import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import LoginScreen from './frontend/src/screens/LoginScreen';
import AppDrawer from './AppNavigation';

// Context
import { UserProvider } from './frontend/src/context/UserContext';

// SQLite
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './frontend/src/db/database';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <SQLiteProvider databaseName="recetas.db" onInit={initializeDatabase}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />

            <Stack.Screen 
              name="Main" 
              component={AppDrawer} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </UserProvider>
  );
};

export default App;
