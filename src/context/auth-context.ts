// import React, { createContext, useState, useEffect } from 'react';
// import { Stream } from 'stream';


// type AuthContextType = {
//  isAuthenticated : boolean | null,
//  accessToken: string | null
// }

// export const AuthContext = createContext<AuthContextType>({});

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
 

//   // Fetch initial login state from local storage or make a request
//   useEffect(() => {
//     // ... fetch initial state logic
//   }, []);

//   // Function to handle login


//   // Function to handle logout
//   const handleLogout = () => {
//     // ... logout logic
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, accessToken, handleLogin, handleLogout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function authHeader() {
//   const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
//   if (refresh_token) {
//     return { Authorization: 'Bearer ' + token};
//   } else {
//     return { Authorization: '' };
//   }
// }

// const handleRefreshLogin = async () => {
//   // ... login logic
// };
// // create a function that handles making protected request, by hitting the protected endpoint with the token if token expired then hit the refresh_login endpoint and get a new access token

// const ApiRequest = async (url: string, method = 'GET', data: object = {}) => {
//     const { isAuthenticated, accessToken} = React.useContext(AuthContext);
  
//     try {
//       const response = await fetch({
//         url,
//         method,
//         data,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         // Token expired, try to refresh
//         try {
//           const refreshedToken = await handleLogin();
//           return await makeProtectedRequest(url, method, data);
//         } catch (refreshError) {
//           // Handle refresh failure
//         }
//       } else {
//         // Handle other errors
//       }
//     }
//   };
  
//   export default makeProtectedRequest;