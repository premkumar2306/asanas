import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { FormInput } from '../components/Auth/FormInput';
import { AuthButton } from '../components/Auth/AuthButton';
import { useAuth } from '../hooks/useAuth';
import type { SignInFormData } from '../types/auth';

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  
  const { isLoading, error, handleEmailSignIn, handleGoogleSignIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEmailSignIn(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo and Title */}
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/assets/logos/default-logo.svg"
            alt="Yogasara"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Email Sign In Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <FormInput
              type="email"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              placeholder="Email address"
              required
              Icon={HiMail}
            />
            <FormInput
              type="password"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              placeholder="Password"
              required
              Icon={AiOutlineLock}
            />
          </div>

          <AuthButton
            type="submit"
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? 'Signing in...' : 'Sign in with Email'}
          </AuthButton>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <AuthButton
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variant="secondary"
          icon={FcGoogle}
        >
          Sign in with Google
        </AuthButton>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
