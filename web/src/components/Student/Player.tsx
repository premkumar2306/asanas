import React from "react";
import { PoseDisplay } from "./PoseDisplay";
import { useYogaFlow } from "../../hooks/useYogaFlow";
import { Button } from '../common/Button';
import { IoPlaySkipForward, IoPlay, IoPause } from 'react-icons/io5';

export const Player: React.FC = () => {
  const {
    poses,
    currentPoseIndex,
    timeLeft,
    isPaused,
    nextPose,
    togglePause,
  } = useYogaFlow();

  if (poses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const currentPose = poses[currentPoseIndex];
  const progressPercent = ((currentPoseIndex + 1) / poses.length) * 100;

  return (
    <div className="player min-h-[calc(100vh-6rem)] pt-4 flex flex-col items-center justify-start text-center relative">
      {/* Progress bar */}
      <div 
        className="absolute top-0 left-0 h-2 bg-blue-400 transition-all duration-300" 
        style={{ width: `${progressPercent}%` }} 
      />
      
      <PoseDisplay
        pose={currentPose}
        currentIndex={currentPoseIndex}
        totalPoses={poses.length}
        timeLeft={timeLeft}
      />

      {currentPoseIndex < poses.length - 1 ? (
        <div className="flex flex-col gap-2 absolute bottom-10">
          <Button
            onClick={nextPose}
            variant="primary"
            icon={IoPlaySkipForward}
          >
            Skip / Next Pose
          </Button>
          <Button
            onClick={togglePause}
            variant="secondary"
            size="sm"
            icon={isPaused ? IoPlay : IoPause}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>
      ) : (
        <div className="text-green-600 text-xl font-semibold mt-6">
          🎉 You've completed this flow!
        </div>
      )}
    </div>
  );
};

export default Player;
