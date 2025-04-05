import React from 'react';
import { TabType } from '../../pages/Classes/types';

interface TabSelectorProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabSelector({ currentTab, onTabChange }: TabSelectorProps) {
  const tabs: TabType[] = ["all", "group", "personal", "workshop"];
  
  return (
    <div className="space-x-4 mb-4">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded ${
            currentTab === tab ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          {tab === "all" ? "All classes" : `${tab.charAt(0).toUpperCase() + tab.slice(1)} classes`}
        </button>
      ))}
    </div>
  );
}