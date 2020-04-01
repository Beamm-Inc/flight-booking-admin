import AuthAPI from "./auth.api";
import UserAccountAPI from "./user-account.api";
import UserAPI from "./user.api";
import RoleAPI from "./role.api";
import AirplaneAPI from "./airplane.api"

const API_ROOT = process.env.VUE_APP_API_ROOT;
export {
  API_ROOT,
  AuthAPI,
  UserAccountAPI,
  UserAPI,
  RequestAPI,
  AirplaneAPI,
  RoleAPI
};
