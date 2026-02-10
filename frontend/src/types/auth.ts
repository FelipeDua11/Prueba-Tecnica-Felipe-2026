export interface User {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'User';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
