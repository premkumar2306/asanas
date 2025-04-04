import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Navbar() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-xl">Yogasara</Link>
      </div>
      <div className="space-x-4">
        <Link to="/flow-builder">{t("flowBuilder")}</Link>
        {user ? (
          <>
            <span className="text-gray-300">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
