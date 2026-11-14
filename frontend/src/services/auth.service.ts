import api from "./api.service";
import type {
  IAuthResponse,
  SignInCredentials,
  SignUpCredentials,
  User,
} from "../types/auth.types";
const signin = async (credentials: SignInCredentials): Promise<User> => {
  const { data } = await api.post<IAuthResponse>("/auth/signin", credentials);

  return data.user;
};

const signup = async (credentials: SignUpCredentials): Promise<User> => {
  const { data } = await api.post<IAuthResponse>("/auth/signup", credentials);

  return data.user;
};
const getProfile = async (): Promise<User> => {
  const res = await api.get("/users/me", { withCredentials: true });
  return res.data;
};

const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

const authService = {
  signin,
  signup,
  logout,
  getProfile,
};

export default authService;
