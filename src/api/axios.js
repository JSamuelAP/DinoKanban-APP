import axios from "axios";

// const BASE_URL = "https://dinokanban-api.onrender.com/api/v1/";
const BASE_URL = "http://192.168.1.10:3000/api/v1/";

const api = axios.create({
	baseURL: BASE_URL,
});

const apiPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

api.defaults.headers.common["Content-Type"] = "application/json";
apiPrivate.defaults.headers.common["Content-Type"] = "application/json";

export default api;
export { apiPrivate };
