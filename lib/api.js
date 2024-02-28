import axios from "axios";

function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  console.log("response", response);
  const data = await response.json();
  return data;
}

const registerApi = (body) => {
  return axios({
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}/auth/local/register`,
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: body
  })
}

const loginApi = (body) => {
  return axios({
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}/auth/local`,
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: body
  })
}

export { loginApi, registerApi, fetchAPI, getStrapiURL }