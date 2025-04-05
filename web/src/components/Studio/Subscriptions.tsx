import React from "react";

type SessionPlan = {
  id: string;
  batchTitle: string;
  level: string;
  notes: string;
  startDate: string;
  price: number;
  sessions: number;
  duration: string;
};

const mockPlans: SessionPlan[] = [
  {
    id: "1",
    batchTitle: "Roots – 7:15 PM IST",
    level: "Beginner to Intermediate.",
    notes: "Factoring to Daylight Savings,\nRoots 6:15 pm IST will be scheduled to 7:15",
    startDate: "01-May-2025",
    price: 66,
    sessions: 20,
    duration: "1 month",
  },
  {
    id: "2",
    batchTitle: "Trunk – 6:00 PM IST",
    level: "Intermediate Level.",
    notes: "Sessions rescheduled post March due to seasonal shifts.",
    startDate: "15-May-2025",
    price: 75,
    sessions: 22,
    duration: "1 month",
  },
];

const InstructorSessionAdmin: React.FC = () => {
  return (
    <div className="space-y-6">
      {mockPlans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-xl shadow border p-4 relative">
          <div className="bg-green-100 text-green-900 px-4 py-1 rounded-full font-semibold inline-block mb-3">
            {plan.batchTitle}
          </div>
          <p className="mb-2">{plan.level}</p>
          <p className="mb-4 text-sm text-gray-700 whitespace-pre-line">{plan.notes}</p>

          <hr className="my-3" />
          <div className="text-sm text-yellow-600 mb-2">
            ⚠️ Subscription for this plan starts on <strong>{plan.startDate}</strong>
          </div>
          <hr className="my-3" />
          <p className="text-md">
            {plan.sessions} classes • <strong>USD {plan.price}</strong>
          </p>
          <p className="text-sm text-gray-600">Valid for {plan.duration}</p>

          <button className="absolute bottom-4 right-4 bg-emerald-500 text-white px-5 py-2 rounded-full shadow-lg font-bold">
            Pay
          </button>
        </div>
      ))}
    </div>
  );
};

export default InstructorSessionAdmin;