import { ClassItem } from "../components/Classes/types";
import { DAYS_OF_WEEK } from "../components/Classes/types";

const formatDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

// Sample plans based on the data structure
const SAMPLE_PLANS = [
  "Hatha Beginners & Breathwork",
  "Meditation & Mindfulness Workshop",
  "Basic Monthly Plan",
  "Premium Quarterly Plan",
];

const createRepeatedClasses = (
  baseDate: Date,
  recurringDays: string[],
  duration: number,
  baseData: Partial<ClassItem>,
  rangeInDays = 30,
  existingTimestamps: Set<number> = new Set(),
): ClassItem[] => {
  const repeatedClasses: ClassItem[] = [];

  for (let i = 0; i < rangeInDays; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    if (recurringDays.includes(weekday)) {
      const startTime = new Date(date);
      const baseStart = new Date(baseData.startsAt || baseDate);
      startTime.setHours(baseStart.getHours(), baseStart.getMinutes(), 0, 0);

      if (!existingTimestamps.has(startTime.getTime())) {
        existingTimestamps.add(startTime.getTime());
        repeatedClasses.push({
          ...(baseData as ClassItem),
          id: Date.now() + startTime.getTime() + i,
          date: formatDate(startTime),
          startsAt: startTime.toISOString(),
          timestamp: startTime.getTime(),
          time:
            startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) + " IST",
          duration,
          recurringDays,
          canStart: startTime.getTime() <= Date.now(),
        });
      }
    }
  }

  return repeatedClasses;
};

const getRandomDays = (): string[] => {
  const numDays = Math.floor(Math.random() * 3) + 1; // 1-3 days
  const shuffled = [...DAYS_OF_WEEK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numDays);
};

const getRandomPlans = (): string[] => {
  const numPlans = Math.floor(Math.random() * 2) + 1; // 1-2 plans
  const shuffled = [...SAMPLE_PLANS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numPlans);
};

export const generateDummyClasses = (): ClassItem[] => {
  const dummyClasses: ClassItem[] = [];
  const today = new Date();
  const seenTimestamps = new Set<number>();

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const classesPerDay = Math.floor(Math.random() * 3) + 2;

    for (let j = 1; j <= classesPerDay; j++) {
      const classHour = 6 + j * 2;
      currentDate.setHours(classHour, 0, 0, 0);

      const type =
        j % 4 === 0 ? "workshop" : j % 3 === 0 ? "personal" : "group";
      const isRecurring =
        type === "group" || (type === "personal" && Math.random() > 0.5);

      const repeated = createRepeatedClasses(
        new Date(currentDate),
        isRecurring
          ? getRandomDays()
          : [currentDate.toLocaleDateString("en-US", { weekday: "long" })],
        60,
        {
          title: `Class ${j} ${type === "workshop" ? "Workshop" : type === "personal" ? "Personal Session" : "Group Class"}`,
          teacher: j % 2 === 0 ? "Ravi" : "Sneha",
          type: type as "group" | "personal" | "workshop",
          fees: j % 3 === 0 ? "INR 500" : "Included in plan",
          description: `Class ${j} ${type} description`,
          classType: "online",
          paymentModel: "standard",
          trialDropIn: Math.random() > 0.7,
          eligiblePlans: type === "workshop" ? [] : getRandomPlans(),
          discountCodes: [],
          shareRecording: Math.random() > 0.5,
          autoRecord: Math.random() > 0.5,
          enforceFormFill: Math.random() > 0.7,
        },
        30,
        seenTimestamps,
      );
      dummyClasses.push(...repeated);
    }
  }
  return dummyClasses.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
};
