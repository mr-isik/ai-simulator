'use client';

import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext({
  selectedTab: '',
  setSelectedTab: () => {},
});

export const Tabs = ({ children, defaultValue, className }) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={cn('w-full h-full flex flex-col', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex p-2 gap-2 rounded-xl bg-slate-800 border border-slate-700',
        className
      )}
    >
      {children}
    </div>
  );
};

export const Tab = ({ children, value, className }) => {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  const selected = value === selectedTab;

  return (
    <button
      className={cn(
        'px-4 py-2 text-lg font-medium rounded-lg transition-colors',
        selected
          ? 'text-white bg-slate-600'
          : 'text-gray-400 bg-slate-700 hover:bg-slate-600/50',
        className
      )}
      onClick={() => setSelectedTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, className }) => {
  return <div className={cn('w-full flex-1', className)}>{children}</div>;
};

export const TabPanel = ({ children, value, className }) => {
  const { selectedTab } = useContext(TabsContext);

  if (value !== selectedTab) return null;

  return <div className={cn('w-full h-full', className)}>{children}</div>;
};

export default Tabs;
