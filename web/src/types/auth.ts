export interface AuthError {
  code: string;
  message: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string;
}
