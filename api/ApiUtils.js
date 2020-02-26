const _apiHost = process.env.API_URL;
const _apiKey = process.env.API_KEY;

async function request(url, params, method = "GET") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (params) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(_apiHost + url, options);
  return response.status !== 200
    ? handleError(response.error)
    : handleResponse(response);
}

const objectToQueryString = obj => {
  obj["api_key"] = _apiKey;
  obj["language"] = "en-US";
  return Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&");
};

async function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

const handleError = error => {
  console.error("API call failed. " + error);
  throw error;
};

const GetRequest = (url, params) => {
  return request(url, params);
};

export default GetRequest;
