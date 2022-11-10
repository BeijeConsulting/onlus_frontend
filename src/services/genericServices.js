import axios from "axios";
import PROPERTIES from "../utils/properties";
import { updateAuthTokenApi } from "./api/updateAuthTokenApi";

const axiosInstance = axios.create({
  baseURL: PROPERTIES.BASEURL,
  timeout: PROPERTIES.TIMEOUT,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("onlusToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log(originalRequest)
    if (
      error.response.status === 401 &&
      originalRequest.url === `${PROPERTIES.BASEURL}/updateAuthToken`
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (localStorage.getItem("onlusRefreshToken") !== null) {
        updateAuthTokenApi().then((res) => {
          const { token, refreshToken } = res.data;
          localStorage.setItem("onlusToken", token);
          localStorage.setItem("onlusRefreshToken", refreshToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("onlusToken");
        });
      }
    }

    return Promise.reject(error);
  }
);

export function responseApi(response) {
  return {
    data: response?.data,
    status: response?.status,
  };
}
export function responseApiError(error) {
  return {
    message: error?.message,
    status: error?.status,
  };
}

export async function getApi(resource, header = null) {
  return axiosInstance
    .get(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseApiError(error);
    });
}

export async function postApi(resource, obj, header = null) {
  return axiosInstance
    .post(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseApiError(error);
    });
}

export async function putApi(resource, obj, header = null) {
  return axiosInstance
    .put(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseApiError(error);
    });
}

export async function deleteApi(resource, header = null) {
  return axiosInstance
    .delete(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseApiError(error);
    });
}
