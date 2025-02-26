import poses from "../data.json" assert { type: "json" };

interface Pose {
  id: number;
  english_name: string;
  sanskrit_name: string;
  difficulty: number;
  description: string;
  pose_meta: string[];
  category: string;
  benefits: string[];
  image_url: string;
  video_url: string;
  duration: string;
  difficulty_level: string;
}

const resolvers = {
  Query: {
    poses: (
      _: unknown,
      {
        limit,
        offset,
        search,
      }: { limit?: number; offset?: number; search?: string },
    ): Pose[] => {
      let filteredPoses = poses;

      if (search) {
        filteredPoses = filteredPoses.filter(
          (pose) =>
            pose.english_name.toLowerCase().includes(search.toLowerCase()) ||
            pose.sanskrit_name.toLowerCase().includes(search.toLowerCase()) ||
            pose.category.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return filteredPoses.slice(
        offset || 0,
        (offset || 0) + (limit || filteredPoses.length),
      );
    },
    pose: (_: unknown, { id }: { id: number }): Pose | undefined =>
      poses.find((p) => p.id === id),
  },
};

export default resolvers;
