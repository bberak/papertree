import * as Keychain from "react-native-keychain";
import base64 from "base-64";
import { Actions } from "react-native-router-flux";

let _authHeader = null;

const _generateAuthHeader = (email, password) => {
  if (!email || !password)
    throw new Error("Email and password cannot be empty");

  let encodedString = base64.encode(`${email}:${password}`);
  return `Basic ${encodedString}`;
}

const _getAuthHeader = async () => {
  let credentials = await Keychain.getGenericPassword();
  if (credentials.username && credentials.password)
    return _generateAuthHeader(credentials.username, credentials.password);
  else
    return null;
}

let _testCredentialsAndGenerateAuthHeader = async (email, password) => {
  let authHeader = _generateAuthHeader(email, password);
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

let _logoutAndClean = async () => {
  _authHeader = null;
  await Keychain.resetGenericPassword();
  Actions.pop({key: "login"});
}

let _unpack = async result => {
  if (result.status === 400)
    throw new Error(`Bad Request: ${result.json().message}`);

  if (result.status === 401) {
    await _logoutAndClean();

    throw new Error("Unauthenticated");
  }

  if (result.status === 200) return result.json();

  throw new Error("Server Error");
};

let _GET = async url => {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: await _getAuthHeader()
    }
  });

  return await _unpack(response);
};

let _POST = async (url, data) => {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: await _getAuthHeader()
    },
    body: JSON.stringify(data)
  });

  return await _unpack(response);
};

let _DELETE = async url => {
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: await _getAuthHeader()
    }
  });

  return await _unpack(response);
};

module.exports = Object.freeze({
  isLoggedIn: async () => {
    if (_authHeader) return true;
    try {
      let credentials = await Keychain.getGenericPassword();
      if (credentials.username && credentials.password) {
        _authHeader = _generateAuthHeader(credentials.username, credentials.password);
        return true;
      }
      else
        return false;
    } catch (error) {
      return false;
    }
  },
  login: async (email, password) => {
    _authHeader = await _testCredentialsAndGenerateAuthHeader(email, password);
    await Keychain.setGenericPassword(email, password);
  },
  logout: async () => {
    await _logoutAndClean();
  },
  search: async (searchTerm, filter, minId, maxId, limit) => {
    filter = filter || {};

    let now = (new Date()).getTime();

    if (filter.minTime && filter.minTime > now) {
      return {}; //-- Invalid query, start time cannot be in the future
    }

    if (filter.minTime && filter.maxTime && filter.minTime > filter.maxTime) {
      return {}; //-- Invalid query, start time cannot be greater than end time
    }

    let query = {
      q: searchTerm,
      limit: limit || 20,
      tail: true,
      group_id: filter.groupId,
      system_id: filter.systemId,
      min_id: minId,
      max_id: maxId,
      min_time: filter.minTime ? filter.minTime / 1000 : null, //-- Api expects seconds, not milliseconds
      max_time: filter.maxTime ? filter.maxTime / 1000 : null //-- Api expects seconds, not milliseconds
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

    return await _GET(url);
  },
  listSearches: async () => {
    return await _GET("https://papertrailapp.com/api/v1/searches.json")
  },
  saveSearch: async (name, searchTerm, filter) => {
    filter = filter || {};

    let query = {
      "search[name]": name,
      "search[query]": searchTerm,
      "search[group_id]": filter.groupId,
    };

    let qs = Object.keys(query)
      .map(x => {
        let val = query[x];
        if (val === undefined || val === null || val === "") return false;
        return `${x}=${encodeURIComponent(val)}`;
      })
      .filter(x => x)
      .join("&");

    let url = `https://papertrailapp.com/api/v1/searches.json?${qs}`;

    return await _POST(url, null);
  },
  deleteSearch: async (id) => {
    let url = `https://papertrailapp.com/api/v1/searches/${id}.json?`;

    return await _DELETE(url, null);
  },
  listSystems: async () => {
    return await _GET("https://papertrailapp.com/api/v1/systems.json")
  },
  listGroups: async () => {
    return await _GET("https://papertrailapp.com/api/v1/groups.json")
  },
});
