import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from "./GameContext";
import { sampleQuizzes } from "./mockData";
import {
  LayoutDashboard,
  CheckSquare,
  HelpCircle,
  Trophy,
  UserCheck,
  Flame,
  Leaf
} from "lucide-react";

function DashboardContent() {
  const [travelKm, setTravelKm] = useState("");
  const { user, addPoints, activeTab, setActiveTab, leaderboard } = useGame();
  const [streak, setStreak] = useState(5);
  const { completedQuests, setCompletedQuests } = useGame();
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTip, setAiTip] = useState("Tip: Turning off unused appliances saves energy.");

  const [iotStatus, setIotStatus] = useState("Connected (Syncing...)");

  useEffect(() => {
    const simulatedEvents = [
      "Smart Bin #4: Waste Sorted Successfully",
      "Air Quality Sensor: Optimal Level",
      "Solar Panel Array: Generating Energy",
      "IoT Module: Telemetry Packet Received"
    ];

    const interval = setInterval(() => {
      const randomEvent = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      setIotStatus(randomEvent);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!user) return <div>Loading...</div>;

  const handleCompleteQuest = (questId, pointsReward) => {
    if (completedQuests.includes(questId)) return;
    setCompletedQuests([...completedQuests, questId]);
    addPoints(pointsReward);
    alert(`🎉 Quest Completed! +${pointsReward} Eco-Points added!`);
  };

  return (
    <div className="flex h-screen bg-emerald-50/40 text-slate-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-emerald-100 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-emerald-900">EcoQuest</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'tasks', label: 'Eco-Quests', icon: CheckSquare },
              { id: 'quiz', label: 'Eco-Quizzes', icon: HelpCircle },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'admin', label: 'Teacher Portal', icon: UserCheck },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-emerald-900 truncate">{user.name}</p>
            <p className="text-xs text-emerald-600 truncate">{user.school}</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-emerald-100 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak} Day Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-sm font-bold shadow-sm">
              <Leaf className="w-4 h-4" />
              <span>{user.points} XP / Eco-Points</span>
            </div>
          </div>
        </header>

        {/* PAGE VIEWS */}
        <main className="p-8">
          
          {/* IoT Sensor Hub Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#e8f5e9', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#2e7d32', fontWeight: '500', marginBottom: '15px' }}>
            <span style={{ height: '8px', width: '8px', backgroundColor: '#4caf50', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
            IoT Sensor Hub: <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>{iotStatus}</span>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-lg shadow-emerald-900/10">
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🌱</h1>
                <p className="text-emerald-100 text-sm">
                  You are on Level 3! Complete today's quest to keep your streak active.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">CO₂ Offset</p>
                  <p className="text-2xl font-black text-emerald-900">12.5 kg</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trees Planted</p>
                  <p className="text-2xl font-black text-emerald-900">3</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Level</p>
                  <p className="text-2xl font-black text-emerald-900">Level 3</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Available Eco-Quests</h2>
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-emerald-900">Plant a Sapling</h3>
                  <p className="text-sm text-slate-500">Upload a photo of a newly planted tree or sapling.</p>
                </div>
                <button 
                  onClick={() => handleCompleteQuest('quest-1', 50)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition"
                >
                  Complete (+50 XP)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Daily Eco-Quiz</h2>
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <p className="font-medium text-slate-700 mb-4">{sampleQuizzes[0]?.question || "Which energy source is completely renewable?"}</p>
                <div className="space-y-2">
                  {sampleQuizzes[0]?.options?.map((opt, idx) => (
                    <button key={idx} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">School Leaderboard</h2>
              <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
                <div className="p-4 bg-emerald-50 font-bold text-emerald-900 flex justify-between">
                  <span>Student Name</span>
                  <span>Eco-Points</span>
                </div>
                {leaderboard && leaderboard.length > 0 ? (
                  leaderboard.map((student, index) => (
                    <div key={index} className="p-4 border-t border-emerald-50 flex justify-between items-center">
                      <span className="font-medium text-slate-700">{index + 1}. {student.name}</span>
                      <span className="font-bold text-emerald-600">{student.points} XP</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-slate-500">No leaderboard data available.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Teacher Portal & Verification</h2>
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <p className="text-slate-600">Review and approve student-submitted environmental action tasks here.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <DashboardContent />
    </GameProvider>
  );
}