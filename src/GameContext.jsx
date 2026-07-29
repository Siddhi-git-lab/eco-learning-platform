import React, { createContext, useContext, useState } from 'react';
import { initialUserData } from "./mockData";
import confetti from 'canvas-confetti';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedQuests, setCompletedQuests] = useState([]);

  const addPoints = (amount, reason = "Task Completed!") => {
    setUser((prev) => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 200) + 1;
      
      if (newLevel > prev.level) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  return (
    <GameContext.Provider value={{ user, addPoints, activeTab, setActiveTab, completedQuests, setCompletedQuests }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);