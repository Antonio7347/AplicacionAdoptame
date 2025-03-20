import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import MainNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}