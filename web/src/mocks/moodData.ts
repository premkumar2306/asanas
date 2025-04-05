export const mockRecentMoods = [
  {
    createdAt: {
      toDate: () => new Date(2024, 0, 15, 9, 30)
    },
    moodBefore: 3,
    moodAfter: 4
  },
  {
    createdAt: {
      toDate: () => new Date(2024, 0, 14, 16, 0)
    },
    moodBefore: 2,
    moodAfter: 4
  },
  // ... rest of the mood data
];