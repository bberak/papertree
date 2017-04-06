import * as Keychain from 'react-native-keychain';
import base64 from 'base-64'; 

let authHeader = null;

let testCredentialsAndGenerateAuthHeader = async (email, password) => {
  if (!email || !password)
   throw new Error("Email and password cannot be empty")
  
  let encodedString = base64.encode(`${email}:${password}`);
  let authHeader =  `Basic ${encodedString}`
  let result = await fetch("https://papertrailapp.com/api/v1/searches.json", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": authHeader,
    }
  });
  
  if (result.status !== 200)
    throw new Error("Incorrect credentials. Please check your email and password");
  
  return authHeader;
};

module.exports = Object.freeze({
  isAuthenticated: async () => {
    if (authHeader)
      return true;
    try {
      let credentials = await Keychain.getGenericPassword();
      authHeader = await testCredentialsAndGenerateAuthHeader(credentials.username, credentials.password);
      return true;
    } catch (error) {
      return false;
    }
  },
  authenticate: async (email, password) => {
    authHeader = await testCredentialsAndGenerateAuthHeader(email, password)
    await Keychain.setGenericPassword(email, password)
  }
})