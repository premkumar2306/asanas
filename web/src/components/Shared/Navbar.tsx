import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Navbar() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navSections = [
    {
      label: "Classes",
      links: [
        { label: "Upcoming", path: "/upcoming-classes" },
        { label: "Recent", path: "/class-recent" },
        { label: "Settings", path: "/class-settings" },
        { label: "Zoom host key", path: "/zoom-host-key" },
        { label: "Zoom recording", path: "/zoom-recording-settings" },
        { label: "Teacher settings", path: "/teacher-settings" },
        { label: "Session summary", path: "/session-summary" }
      ],
    },

    {
      label: "Studio",
      links: [
        { label: "Studio Details", path: "/studio-details" },
        { label: "Locations", path: "/in-studio-locations" },
        { label: "Plans & Pricing", path: "/plans-pricing" },
        { label: "Redemption", path: "/redemption-settings" },
        { label: "Team", path: "/team" },
      ],
    },
    {
      label: "TODO",
      links: [
        { label: "Billing", path: "/billing" },
        { label: "Reports", path: "/reports" },
        { label: "Subscriptions", path: "/subscriptions" },
        { label: "Redemption", path: "/redemption-settings" },
        { label: "Team", path: "/team" },
      ],
    },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Yogasara
        </Link>
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`mt-4 md:mt-0 ${mobileMenuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-6`}>
        <Link to="/flow-builder" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-gray-300">
          Flow
        </Link>
        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-gray-300">
          Dashboard
        </Link>

        {navSections.map((section) => (
          <div key={section.label} className="block md:inline-block">
            <button
              onClick={() => setActiveDropdown(activeDropdown === section.label ? null : section.label)}
              className="block w-full text-left py-2 hover:text-gray-300"
            >
              {section.label}
            </button>
            {activeDropdown === section.label && (
              <div className="pl-4 md:absolute md:top-full md:left-0 mt-1 w-max bg-gray-700 rounded shadow-lg z-50 py-2 px-4 space-y-1">
                {section.links.map((link) => (
                  <Link key={link.label} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-gray-300">
          Help
        </Link>

        <div className="pt-2">
          {user ? (
            <div className="space-y-2">
              <span className="block text-sm text-gray-300">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm w-full"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm w-full"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;