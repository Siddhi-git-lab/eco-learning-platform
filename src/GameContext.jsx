import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData } from "./mockData";
import confetti from 'canvas-confetti';
import { supabase } from "./supabase";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedQuests, setCompletedQuests] = useState([]);
  const [quests, setQuests] = useState([]);

  // Fetch quests from Supabase
  useEffect(() => {
    async function fetchQuests() {
      const { data, error } = await supabase.from('quests').select('*');
      if (error) {
        console.error('Error fetching quests:', error);
      } else if (data && data.length > 0) {
        setQuests(data);
      }
    }
    fetchQuests();
  }, []);

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
    <GameContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        completedQuests,
        setCompletedQuests,
        quests,
        addPoints,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);