import React from 'react';
import { SubscriptionPlan } from '../../types';

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for beginners',
    price: 49,
    duration: 'monthly',
    classesPerMonth: 8,
    features: [
      '8 classes per month',
      'Access to beginner classes',
      'Class recordings for 24 hours',
      'Basic pose library'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Most popular choice',
    price: 89,
    duration: 'monthly',
    classesPerMonth: 16,
    features: [
      '16 classes per month',
      'Access to all level classes',
      'Class recordings for 7 days',
      'Full pose library',
      'Priority booking'
    ]
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    description: 'For dedicated practitioners',
    price: 149,
    duration: 'monthly',
    classesPerMonth: 999,
    features: [
      'Unlimited classes',
      'Access to all level classes',
      'Permanent class recordings',
      'Full pose library',
      'Priority booking',
      '1-on-1 monthly consultation'
    ]
  }
];

const SubscriptionPlans: React.FC = () => {
  const handleSubscribe = async (planId: string) => {
    // Implement Stripe/payment integration here
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect plan for your yoga journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Subscribe to {plan.name}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;