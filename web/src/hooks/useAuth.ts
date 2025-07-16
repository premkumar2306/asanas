import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import type { SignInFormData, AuthState } from "../types/auth";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: "",
  });
  const navigate = useNavigate();

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error: string) => {
    setState((prev) => ({ ...prev, error }));
  };

  const handleEmailSignIn = async (formData: SignInFormData) => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...state,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
};
