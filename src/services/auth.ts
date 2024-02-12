// import axios from "axios";

// const API_URL = "http://localhost:8080/api/";

// export const register = async (
//   username: string,
//   email: string,
//   password: string,
// ) => {
//   return await axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

// export const login = async (username: string, password: string) => {
//   const response = await axios.post(API_URL + "signin", {
//     username,
//     password,
//   });
//   if (response.data.accessToken) {
//     window.localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };

// export const logout = () => {
//   window.localStorage.removeItem("user");
// };

// export const getCurrentUser = () => {
//   const userStr = window.localStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);

//   return null;
// };
