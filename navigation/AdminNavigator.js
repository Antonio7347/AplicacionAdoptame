import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminHomeScreen from "../screens/AdminHomeScreen";

const Drawer = createDrawerNavigator();

const AdminNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={AdminHomeScreen} />
  </Drawer.Navigator>
);

export default AdminNavigator;
