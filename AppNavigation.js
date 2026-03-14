import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./frontend/src/screens/ProfileScreen";
import HomeScreen from "./frontend/src/screens/HomeScreen";
import RecipeScreen from "./frontend/src/screens/RecipeScreen";
import ListScreen from "./frontend/src/screens/ListScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppDrawer = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Principal" component={HomeScreen} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Ingresar recetas" component={RecipeScreen} />
        <Drawer.Screen name="Lista de recetas" component={ListScreen} />
    </Drawer.Navigator>
);

const AppTabs = () => (

    <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: darkMode ? "#222" : "#005187" },
            headerTintColor: darkMode ? "#eaeeffff" : "#222",
            tabBarStyle: { backgroundColor: darkMode ? "#222" : "#eaeeffff" },
            tabBarActiveTintColor: darkMode ? "#eaeeffff" : "#005187",
            tabBarInactiveTintColor: darkMode ? "#888" : "#555",
        }}

    >
        <Tab.Screen name="Inicio" component={HomeScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Pacientes" component={PatientsScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="baby-carriage" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Configuraciones" component={ListScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Ayuda" component={HelpScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="help-circle" size={size} color={color} />
                )
            }}
        />

    </Tab.Navigator>
);


export default AppDrawer;