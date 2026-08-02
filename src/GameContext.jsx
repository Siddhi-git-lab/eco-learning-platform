import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData } from './mockData';
import { supabase } from './supabase';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedQuests, setCompletedQuests] = useState([]);
  const [quests, setQuests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

 // Fetch leaderboard and quests together
  useEffect(() => {
    async function loadAllData() {
      // Fetch Leaderboard
      const { data: leaderData, error: leaderError } = await supabase
        .from('leaderboard')
        .select('username,points')
        .order('points', { ascending: false })
        .limit(10);
        
      if (leaderError) {
        console.error('Error fetching leaderboard:', leaderError);
      } else {
        setLeaderboard(leaderData || []);
      }

      // Fetch Quests
      const { data: questData, error: questError } = await supabase.from('quests').select('*');
      if (questError) {
        console.error('Error fetching quests:', questError);
      } else if (questData && questData.length > 0) {
        setQuests(questData);
      }
    }

    loadAllData();
  }, []);
  const addPoints = (amount, reason = "Task Completed") => {
    setUser(prev => {
      const newPoints = prev.points + amount;
      return { ...prev, points: newPoints };
    });
  };

  return (
    <GameContext.Provider value={{
      user,
      setUser,
      activeTab,
      setActiveTab,
      completedQuests,
      setCompletedQuests,
      quests,
      setQuests,
      addPoints,
      leaderboard
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);