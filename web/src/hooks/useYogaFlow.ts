import { useState, useEffect } from "react";
import { Pose, FlowState } from "../types/pose";

export const useYogaFlow = () => {
  const [state, setState] = useState<FlowState>({
    poses: [],
    currentPoseIndex: 0,
    timeLeft: 30,
    isPaused: false,
  });

  const loadPoses = async () => {
    try {
      const response = await fetch("/data/poses.json");
      const data = await response.json();
      setState((prev) => ({
        ...prev,
        poses: data.poses.slice(0, 500),
      }));
    } catch (error) {
      console.error("Failed to load poses:", error);
    }
  };

  const nextPose = () => {
    setState((prev) => ({
      ...prev,
      currentPoseIndex: (prev.currentPoseIndex + 1) % prev.poses.length,
      timeLeft: 30,
    }));
  };

  const togglePause = () => {
    setState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  useEffect(() => {
    loadPoses();
  }, []);

  useEffect(() => {
    if (state.isPaused) return;
    if (state.timeLeft === 0) {
      if (state.currentPoseIndex < state.poses.length - 1) {
        nextPose();
      }
      return;
    }

    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    state.timeLeft,
    state.isPaused,
    state.currentPoseIndex,
    state.poses.length,
  ]);

  return {
    ...state,
    nextPose,
    togglePause,
  };
};
