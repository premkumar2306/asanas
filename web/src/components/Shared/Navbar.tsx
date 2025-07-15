import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Button } from '../common/Button';
import { FcGoogle } from 'react-icons/fc';

function Navbar() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    setActiveDropdown(null);
    setDesktopDropdownOpen(null);
  }, [isMobile]);

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
        // { label: "Zoom host key", path: "/zoom-host-key" },
        // { label: "Zoom recording", path: "/zoom-recording-settings" },
        // { label: "Teacher settings", path: "/teacher-settings" },
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
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            🧘 Yogasara
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/flow-builder" className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">Flow</Link>
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">Dashboard</Link>
            {navSections.map(section => (
              <div key={section.label} className="relative group">
                <button className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">
                  {section.label}
                </button>
                <div className="absolute top-full left-0 bg-white dark:bg-gray-800 shadow-md rounded mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {section.links.map(link => (
                    <Link key={link.label} to={link.path} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link to="/help" className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">Help</Link>
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                <Button variant="danger" size="sm" onClick={handleSignOut}>Sign Out</Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" icon={FcGoogle} onClick={signInWithGoogle}>
                Sign In with Google
              </Button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl text-gray-800 dark:text-white">
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900">
          <Link to="/flow-builder" className="block text-gray-700 dark:text-gray-200 hover:text-emerald-500">Flow</Link>
          <Link to="/dashboard" className="block text-gray-700 dark:text-gray-200 hover:text-emerald-500">Dashboard</Link>
          {navSections.map(section => (
            <div key={section.label}>
              <div className="font-semibold text-gray-600 dark:text-gray-300">{section.label}</div>
              <div className="pl-4 space-y-1">
                {section.links.map(link => (
                  <Link key={link.label} to={link.path} className="block text-gray-700 dark:text-gray-200 hover:text-emerald-500">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/help" className="block text-gray-700 dark:text-gray-200 hover:text-emerald-500">Help</Link>
          {user ? (
            <div className="pt-2">
              <span className="block text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
              <Button variant="danger" size="sm" fullWidth onClick={handleSignOut}>Sign Out</Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" fullWidth icon={FcGoogle} onClick={signInWithGoogle}>
              Sign In with Google
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
