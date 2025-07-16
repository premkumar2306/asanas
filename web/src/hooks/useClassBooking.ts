import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ClassSession, Booking } from "../types";
import { MOCK_CLASSES } from "../data/mockClasses";

export const useClassBooking = () => {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setClasses(MOCK_CLASSES);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = classes.filter((cls) => {
    const levelMatch = selectedLevel === "all" || cls.level === selectedLevel;
    const dayMatch =
      selectedDay === "all" ||
      (cls.recurring && cls.recurringDays?.includes(selectedDay.toLowerCase()));
    return levelMatch && dayMatch;
  });

  const handleBookClass = async (classId: string) => {
    try {
      const booking: Omit<Booking, "id"> = {
        classId,
        studentId: "current-user-id",
        status: "pending",
        bookingDate: new Date(),
        paymentStatus: "pending",
      };

      await addDoc(collection(db, "bookings"), booking);
      alert("Class booked successfully! Please complete the payment.");
    } catch (error) {
      console.error("Error booking class:", error);
      alert("Failed to book class. Please try again.");
    }
  };

  return {
    filteredClasses,
    selectedLevel,
    selectedDay,
    isLoading,
    handleBookClass,
    setSelectedLevel,
    setSelectedDay,
  };
};
