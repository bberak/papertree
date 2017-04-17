import * as Keychain from "react-native-keychain";
import base64 from "base-64";
import { Actions } from "react-native-router-flux";

let authHeader = null;

let testCredentialsAndGenerateAuthHeader = async (email, password) => {
  if (!email || !password)
    throw new Error("Email and password cannot be empty");

  let encodedString = base64.encode(`${email}:${password}`);
  let authHeader = `Basic ${encodedString}`;
  let result = await fetch("https://papertrailapp.com/api/v1/searches.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authHeader
    }
  });

  if (result.status !== 200)
    throw new Error(
      "Incorrect credentials. Please check your email and password"
    );

  return authHeader;
};

let unpack = result => {
  if (result.status === 400)
    throw new Error(`Bad Request: ${result.json().message}`);

  if (result.status === 401) {
    console.log("Unauthenticated");
    authHeader = null;
    Actions.login();
    return;
  }

  if (result.status === 200) return result.json();

  throw new Error("Server Error");
};

let GET = async url => {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authHeader
    }
  });

  return unpack(response);
};

module.exports = Object.freeze({
  isLoggedIn: async () => {
    if (authHeader) return true;
    try {
      let credentials = await Keychain.getGenericPassword();
      authHeader = await testCredentialsAndGenerateAuthHeader(
        credentials.username,
        credentials.password
      );
      return true;
    } catch (error) {
      return false;
    }
  },
  login: async (email, password) => {
    authHeader = await testCredentialsAndGenerateAuthHeader(email, password);
    await Keychain.setGenericPassword(email, password);
  },
  logout: async () => {
    await Keychain.resetGenericPassword();
  },
  search: async (searchTerm, filter, min_id, max_id) => {
    filter = filter || {};

    let query = {
      q: searchTerm,
      limit: 20,
      tail: true,
      group_id: filter.group_id,
      system_id: filter.system_id,
      min_time: filter.min_time,
      max_time: filter.max_time,
      min_id: min_id,
      max_id: max_id
    };

    let qs = Object.keys(query)
      .map(x => {
        let val = query[x];
        if (val === undefined || val === null || val === "") return false;
        return `${x}=${encodeURIComponent(val)}`;
      })
      .filter(x => x)
      .join("&");

    let url = `https://papertrailapp.com/api/v1/events/search.json?${qs}`;

    return await GET(url);
  }
});
