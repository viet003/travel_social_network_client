import axios from "axios";
import reduxStoreConfig from "./reduxConfig";
import { authAction } from "../stores/actions";

// Khởi tạo store một lần (dù có dữ liệu chưa thì vẫn là instance store thật)
const { store } = reduxStoreConfig();

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Luôn lấy token mới nhất trong request
instance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      store.dispatch(authAction.logout());
    }

    if (error.response) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  }
);

export default instance;
