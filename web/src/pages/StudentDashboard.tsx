import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function StudentDashboard() {
  const { t } = useTranslation();
  const [weeklyStats, setWeeklyStats] = useState({
    sessionsCompleted: 0,
    averageMoodImprovement: 0,
    totalPracticeTime: 0,
  });
  const [recentMoods, setRecentMoods] = useState([]);

  const mockRecentMoods = [
    {
      createdAt: {
        toDate: () => new Date(2024, 0, 15, 9, 30), // January 15, 2024, 9:30 AM
      },
      moodBefore: 3,
      moodAfter: 4,
    },
    {
      createdAt: {
        toDate: () => new Date(2024, 0, 14, 16, 0), // January 14, 2024, 4:00 PM
      },
      moodBefore: 2,
      moodAfter: 4,
    },
    {
      createdAt: {
        toDate: () => new Date(2024, 0, 13, 10, 15), // January 13, 2024, 10:15 AM
      },
      moodBefore: 4,
      moodAfter: 5,
    },
    {
      createdAt: {
        toDate: () => new Date(2024, 0, 12, 14, 45), // January 12, 2024, 2:45 PM
      },
      moodBefore: 3,
      moodAfter: 3,
    },
    {
      createdAt: {
        toDate: () => new Date(2024, 0, 11, 8, 0), // January 11, 2024, 8:00 AM
      },
      moodBefore: 2,
      moodAfter: 5,
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setRecentMoods(mockRecentMoods);

      // Calculate stats from mock data
      const moodImprovements = mockRecentMoods.map(
        (mood) => mood.moodAfter - mood.moodBefore,
      );
      const averageImprovement =
        moodImprovements.reduce((a, b) => a + b, 0) / moodImprovements.length;

      setWeeklyStats({
        sessionsCompleted: mockRecentMoods.length,
        averageMoodImprovement: parseFloat(averageImprovement.toFixed(1)),
        totalPracticeTime: mockRecentMoods.length * 30,
      });
    }, 500);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t("studentDashboard")}</h2>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Sessions</h3>
          <p className="text-3xl font-bold text-blue-600">
            {weeklyStats.sessionsCompleted}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Sessions This Week</h3>
          <p className="text-3xl font-bold text-green-600">
            {weeklyStats.averageMoodImprovement > 0 ? "+" : ""}
            {weeklyStats.averageMoodImprovement}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Practice Time</h3>
          <p className="text-3xl font-bold text-purple-600">
            {weeklyStats.totalPracticeTime}min
          </p>
        </div>
      </div>

      {/* Recent Mood History */}
      {recentMoods.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {recentMoods.map((mood, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="text-gray-600">
                  {new Date(mood.createdAt.toDate()).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-4">
                  <span>Before: {mood.moodBefore}/5</span>
                  <span>→</span>
                  <span
                    className={
                      mood.moodAfter > mood.moodBefore
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    After: {mood.moodAfter}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
