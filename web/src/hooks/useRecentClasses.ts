import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import type { RecentClass } from "../types/classes";

export const useRecentClasses = (limitCount: number = 5) => {
  const [classes, setClasses] = useState<RecentClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRef = collection(db, "classes");
        const q = query(classesRef, orderBy("date", "desc"), limit(limitCount));

        const snapshot = await getDocs(q);
        const classesData = snapshot.docs.map((doc) => ({
          id: Number(doc.id),
          ...doc.data(),
        })) as RecentClass[];

        setClasses(classesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch classes",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [limitCount]);

  const updateClass = (updatedClass: RecentClass) => {
    setClasses((prev) =>
      prev.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls)),
    );
  };

  return {
    classes,
    isLoading,
    error,
    updateClass,
  };
};
