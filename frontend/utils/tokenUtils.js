import { decode } from "jwt-decode";  // Use named import

// Function to check token expiry
export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = decode(token);  // Decode the token
  const currentTime = Date.now() / 1000;  // Get current time in seconds
  return decodedToken.exp < currentTime;  // Check if token is expired
};
