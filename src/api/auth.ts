import { http } from './http';

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export async function login(_request: LoginRequest): Promise<true> {
  const res = await http.get('/', { validateStatus: () => true });
  if (res.status === 200) return true;

  throw new Error(`Request failed with status code ${res.status}`);
}

export async function register(request: RegisterRequest): Promise<true> {
  const res = await http.post('/register', request, { validateStatus: () => true });
  if (res.status === 200) return true;

  throw new Error(`Request failed with status code ${res.status}`);
}
