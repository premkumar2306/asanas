import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="font-bold text-xl">Yogasara</Link>
      </div>
      <div className="space-x-4">
        <Link to="/instructor/signup">{t("instructorSignup")}</Link>
        <Link to="/flow-builder">{t("flowBuilder")}</Link>
      </div>
    </nav>
  );
}

export default Navbar;