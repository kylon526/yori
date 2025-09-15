import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: number | string | boolean | bigint | symbol | object;
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
