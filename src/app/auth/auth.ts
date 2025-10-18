export interface LoginResponse {
  idusuario: number;
  nomusuario: string;
  token: string;
  mensaje?: string;
}

export interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}