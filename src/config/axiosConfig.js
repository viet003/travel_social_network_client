import axios from "axios";
import reduxStoreConfig from "./reduxConfig"; // Import hàm reduxStoreConfig để lấy store
import { authAction } from "../stores/actions"; // Import action logout

// Tạo instance của axios với baseURL
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy store từ reduxStoreConfig
const { store } = reduxStoreConfig();

// Thêm interceptor cho request
instance.interceptors.request.use(
  function (config) {
    // Thêm xử lý trước khi gửi request, ví dụ: thêm token vào header nếu cần
    return config;
  },
  function (error) {
    // Xử lý lỗi của request
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
instance.interceptors.response.use(
  function (response) {
    // Xử lý response thành công
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      store.dispatch(authAction.logout());
    }

    if (error.response) {
      // Nếu có response từ server (kể cả lỗi), trả về response đó
      return Promise.resolve(error.response);
    }
    
    return Promise.reject(error);
  }
);

export default instance;