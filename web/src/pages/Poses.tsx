import React, { useState, useEffect } from "react";
import Player from "../components/Student/Player";
import { useTranslation } from "react-i18next";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

function StudentDashboard() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t("studentDashboard")}</h2>
      <Player />
    </div>
  );
}

export default StudentDashboard;
