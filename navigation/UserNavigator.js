import { createDrawerNavigator } from "@react-navigation/drawer";
import UserHomeScreen from "../screens/UserHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const UserNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={UserHomeScreen} />
    <Drawer.Screen name="Perfil" component={ProfileScreen} />
  </Drawer.Navigator>
);

export default UserNavigator;
