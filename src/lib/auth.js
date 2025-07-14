import api from "./api";
import { setToken, removeToken } from "./tokens";
import { removeUser, setUser } from "./user";

export const login = async (username, password) => {
  const res = await api.post("/login", { username, password });
  const { token, user } = res.data;
  setToken(token);
  setUser(user);
  return res.data;
};

export const register = async (
  username,
  email,
  password,
  firstname,
  lastname
) => {
  const res = await api.post("/signup", {
    username,
    email,
    password,
    firstname,
    lastname,
  });
  return res.data;
};

export const logout = () => {
  removeToken();
  removeUser();
};
