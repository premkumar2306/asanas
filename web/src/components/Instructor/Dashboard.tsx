import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ClassCard from "./ClassCard";

function Dashboard() {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(classesData);
    };
    fetchClasses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2>Instructor Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            title={cls.title}
            time={cls.time}
            duration={cls.duration}
            gmeetLink={cls.gmeetLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;