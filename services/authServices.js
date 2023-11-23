import axios from "axios";

const BASE_URL = "http://192.168.18.106:8080/auth";

export const signIn = async (email, password, role) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
      role, // Asegúrate de que tu backend maneje este campo correctamente
    });
    return response.data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.response);
    throw error;
  }
};

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      firstName,
      lastName,
      email,
      password,
      role, 
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response);
    throw error;
  }
};
