import Cookies from "js-cookie";

export const getLoginCookie = () => {
  return Cookies.get("access_token");
};

export const setLoginCookie = (token: string) => {
  Cookies.set("access_token", token, { expires: 7 });
};

export const removeLoginCookie = () => {
  Cookies.remove("access_token");
};
