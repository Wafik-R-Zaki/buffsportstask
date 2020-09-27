import axios from "axios";
import { API_URL } from "../constants";
// import AuthHelper from "./authHelper";

const apiClient = axios.create({
  baseURL: API_URL,
});

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
