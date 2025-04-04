import React, { useEffect, useState } from "react";

function Player() {
  const [flow, setFlow] = useState<any[]>([]);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);

  useEffect(() => {
    fetch("/data/poses.json")
      .then(res => res.json())
      .then(data => setFlow(data.poses.slice(0, 500))); // Demo: using first 5 poses
  }, []);

  const nextPose = () => {
    setCurrentPoseIndex((prev) => (prev + 1) % flow.length);
  };

  if (flow.length === 0) return <div>Loading...</div>;

  const currentPose = flow[currentPoseIndex];

  return (
    <div className="player min-h-[calc(100vh-8rem)] relative">
        <h2 className="text-2xl font-bold mb-4">Session Player</h2>
        <div className="pose my-4">
            <h3 className="text-xl font-semibold mb-2">{currentPose.name}</h3>
            <p className="text-gray-600 mb-2">Category: {currentPose.category}</p>
            <div className="description mb-4">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="text-left px-4">{currentPose.description}</p>
            </div>
            <div className="benefits mb-4">
                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="list-disc list-inside text-left px-4">
                    {currentPose.benefits.map((b => <li>{b}</li>))}
                </ul>
            </div>
        </div>
        <div className="obslute fixed bottom-10 left-50">
            <button onClick={nextPose} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors" >Next Pose</button>
        </div>
    </div>
  );
}

export default Player;
