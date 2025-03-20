import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // Hacer la solicitud a la API de reqres.in
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Obtener detalles del usuario desde la API de usuarios
        const usersResponse = await fetch("https://reqres.in/api/users");
        const usersData = await usersResponse.json();
        const userDetails = usersData.data.find((user) => user.email === email);
  
        // Asignar el rol basado en el email
        const role = email === "eve.holt@reqres.in" ? "admin" : "user";
  
        // Guardar los datos del usuario en el estado
        setUser({
          token: data.token,
          email: email,
          role: role,
          details: userDetails, // Datos adicionales del usuario
        });
      } else {
        throw new Error(data.error || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error en el login:", error.message);
      throw error;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};