import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { ClassSession } from '../../types';
import { ClassBookingCard } from '../ClassBooking/ClassBookingCard';

function Dashboard() {
  const [classes, setClasses] = useState<ClassSession[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as ClassSession[];
      setClasses(classesData);
    };
    fetchClasses();
  }, []);

  const handleClassAction = (classId: string) => {
    // Implement instructor-specific action here
    console.log('Class action:', classId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Instructor Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <ClassBookingCard
            key={cls.id}
            cls={cls}
            onBook={handleClassAction}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
