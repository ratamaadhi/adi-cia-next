import axios from "axios";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export const registerApi = (body) => {
  return axios({
    url: `${process.env.NEXT_PUBLIC_URL_LOCAL}/auth/local/register`,
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: body
  })
}

export const loginApi = (body) => {
  return axios({
    url: `${process.env.NEXT_PUBLIC_URL_LOCAL}/auth/local`,
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: body
  })
}