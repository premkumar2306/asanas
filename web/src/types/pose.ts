export interface Pose {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  image?: string;
}

export interface FlowState {
  poses: Pose[];
  currentPoseIndex: number;
  timeLeft: number;
  isPaused: boolean;
}
