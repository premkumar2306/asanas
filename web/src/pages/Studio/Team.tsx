import React from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  gender: "male" | "female";
  imageUrl?: string;
}

// Exporting the mock data so it can be reused across Studio and Team pages
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ananya Sharma",
    role: "Yoga Instructor",
    bio: "Ananya specializes in Hatha Yoga and mindfulness practices, helping students build a strong foundation.",
    gender: "female",
    imageUrl: "https://i.pravatar.cc/200?img=47",
  },
  {
    id: "2",
    name: "Ravi Kumar",
    role: "Ashtanga Instructor",
    bio: "Ravi is passionate about Ashtanga Yoga and dynamic flow sequences, focusing on strength and flexibility.",
    gender: "male",
    imageUrl: "https://i.pravatar.cc/200?img=12",
  },
  {
    id: "3",
    name: "Meera Joshi",
    role: "Vinyasa Instructor",
    bio: "Meera leads energetic classes that sync breath with movement, inspiring students to reach their potential.",
    gender: "female",
    imageUrl: "https://i.pravatar.cc/200?img=47",
  },
  {
    id: "4",
    name: "Arjun Iyer",
    role: "Restorative Yoga Specialist",
    bio: "Arjun focuses on gentle, restorative yoga sessions that help students recover and relax.",
    gender: "male",
    imageUrl: "https://i.pravatar.cc/200?img=12",
  },
  {
    id: "5",
    name: "Sneha Rao",
    role: "Power Yoga Instructor",
    bio: "Sneha delivers challenging power yoga classes designed to build endurance and mental focus.",
    gender: "female",
    imageUrl: "https://i.pravatar.cc/200?img=47",
  },
];

const Team: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Studio Team</h1>
        <p className="text-center text-gray-600 mb-8">
          Meet the passionate instructors who are part of our studio and lead classes for students.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-56 bg-gray-200">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{member.name}</h2>
                <p className="text-center text-gray-500">{member.role}</p>
                <p className="mt-4 text-gray-700 text-center text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;