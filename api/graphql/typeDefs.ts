import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Pose {
    id: Int!
    english_name: String!
    sanskrit_name: String!
    difficulty: Int!
    description: String!
    pose_meta: [String!]!
    category: String!
    benefits: [String!]!
    image_url: String!
    duration: String!
    difficulty_level: String!
  }

  type Query {
    poses(limit: Int, offset: Int, search: String): [Pose!]!
    pose(id: Int!): Pose
    searchPoses(query: String!): [Pose!]!
  }
`;

export default typeDefs;
