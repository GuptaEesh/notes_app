import axios from "axios";
export const instance = axios.create({
  baseURL: "https://polar-waters-89108.herokuapp.com",
});
