import React, { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useTranslation } from "react-i18next";

function SessionSummary() {
  const { t } = useTranslation();
  const [moodAfter, setMoodAfter] = useState(3);
  const [showComparison, setShowComparison] = useState(false);
  const moodBefore = 4; // Dummy mood value from Practice Now

  const submitMood = async () => {
    try {
      await addDoc(collection(db, "moods"), {
        moodAfter,
        createdAt: new Date(),
      });
      console.log("Mood submitted");
    } catch (error) {
      console.error("Error submitting mood", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 container mx-auto">
      <h2>{t("sessionSummary")}</h2>
      <main className="flex-grow">
        <div className="mb-4">
          <label className="block mb-1">Mood After:</label>
          <div className="flex gap-3 text-2xl">
            {[1, 2, 3, 4, 5].map((val) => {
              const emojiMap: { [key: number]: string } = {
                1: "🕸️", // Drained & stuck
                2: "🪁", // Wavering
                3: "🪷", // Centered
                4: "🕊️", // Light and serene
                5: "🌈", // Radiant & elevated
              };
              return (
                <button
                  key={val}
                  onClick={() => setMoodAfter(val)}
                  className={`rounded-full p-2 transition transform hover:scale-110 ${
                    moodAfter === val ? "ring-2 ring-green-500" : ""
                  }`}
                  title={`Mood: ${val}`}
                >
                  {emojiMap[val]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-blue-500 text-white p-2 rounded transition-colors w-full"
          >
            Compare to Practice Now
          </button>
        </div>
        {showComparison && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <p className="text-lg font-semibold mb-2">Comparison</p>
            <p>Practice Now Mood: {moodBefore}</p>
            <p>Session Summary Mood: {moodAfter}</p>
            <p className="mt-2">
              {moodAfter >= moodBefore
                ? "Great improvement!"
                : "Keep working on it!"}
            </p>
          </div>
        )}
      </main>
      <footer className="mt-4">
        <button
          onClick={submitMood}
          className="bg-green-500 text-white p-2 hover:bg-green-600 rounded transition-colors w-full"
        >
          Submit
        </button>
      </footer>
    </div>
  );
}

export default SessionSummary;
