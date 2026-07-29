import React, { useState } from 'react';
import { GameProvider, useGame } from './GameContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  HelpCircle, 
  Trophy, 
  UserCheck, 
  Flame, 
  Leaf 
} from 'lucide-react';

function DashboardContent() {
  const [travelKm, setTravelKm] = useState('');
  const { user, setUser, activeTab, setActiveTab } = useGame();
  const [streak, setStreak] = useState(5);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTip, setAiTip] = useState("Tip: Turning off unused appliances can save up to 10% on energy bills!");
  if (!user) return <div>Loading...</div>;
  const handleCompleteQuest = (questId, pointsReward) => {
  if (completedQuests.includes(questId)) return;

  setCompletedQuests([...completedQuests, questId]);
  setUser(prev => ({ ...prev, points: (prev?.points || 0) + pointsReward }));
  alert(`🎉 Quest Completed! +${pointsReward} Eco-Points added!`);
};

  return (
    <div className="flex h-screen bg-emerald-50/40 text-slate-800 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-emerald-100 p-6 flex flex-col justify-between shadow-sm">
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' 
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

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-emerald-200" />
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.school}</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-emerald-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-semibold text-sm">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{user.streakDays} Day Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 text-white rounded-full font-bold shadow-sm">
              <Leaf className="w-4 h-4" />
              <span>{user.points} XP / Eco-Points</span>
            </div>
          </div>
        </header>

        {/* PAGE VIEWS */}
        <main className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🌱</h2>
                <p className="text-emerald-100">You are on Level {user.level}! Complete today's quest to keep your streak active.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">CO₂ Offset</p>
                  <p className="text-3xl font-extrabold text-emerald-600 mt-2">{user.co2SavedKg} kg</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Trees Planted</p>
                  <p className="text-3xl font-extrabold text-emerald-600 mt-2">{user.treesPlanted}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Current Level</p>
                  <p className="text-3xl font-extrabold text-emerald-600 mt-2">Level {user.level}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="text-xl font-bold text-slate-800">🌱 Daily Eco-Quests</h2>
    <p className="text-slate-600">Complete tasks to earn points and keep your streak!</p>
    {/* CARBON FOOTPRINT CALCULATOR CARD */}
<div className="p-6 my-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
  <div className="flex justify-between items-center">
    <h4 className="font-bold text-slate-800 flex items-center gap-2 text-base">
      <span>🌱</span> Carbon Footprint Estimator
    </h4>
    <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
      Interactive Tool
    </span>
  </div>
  <p className="text-xs text-slate-500">Estimate your daily travel emissions footprint:</p>
  <div className="flex gap-2">
    <input
  type="number"
  placeholder="Distance traveled today (km)"
  value={travelKm}
  onChange={(e) => setTravelKm(e.target.value)}
  className="flex-1 p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none"
/>
<button
  onClick={() => {
    const val = parseFloat(travelKm) || 0;
    const footprint = (val * 0.12).toFixed(1);
    alert(`Calculated: Your estimated travel footprint today is ~${footprint} kg CO2. Good job keeping it low!`);
  }}
  className="px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
>
  Calculate
</button>
  </div>
</div>
    <div className="space-y-3 pt-2">
  {/* Quest 1 */}
  <div className="p-4 border rounded-xl flex items-center justify-between bg-slate-50">
    <div>
      <h4 className="font-semibold text-slate-800">Use a Reusable Water Bottle</h4>
      <p className="text-xs text-slate-500">+50 Eco-Points</p>
    </div>
    <button
      onClick={() => handleCompleteQuest('water-bottle', 50)}
      disabled={completedQuests.includes('water-bottle')}
      className={`px-4 py-2 font-medium text-xs rounded-lg transition ${
        completedQuests.includes('water-bottle')
          ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
          : 'bg-emerald-600 text-white hover:bg-emerald-700'
      }`}
    >
      {completedQuests.includes('water-bottle') ? 'Completed ✓' : 'Complete'}
    </button>
  </div>

  {/* Quest 2 */}
  <div className="p-4 border rounded-xl flex items-center justify-between bg-slate-50">
    <div>
      <h4 className="font-semibold text-slate-800">Plant a Seed / Tree</h4>
      <p className="text-xs text-slate-500">+150 Eco-Points</p>
    </div>
    <button
      onClick={() => handleCompleteQuest('plant-tree', 150)}
      disabled={completedQuests.includes('plant-tree')}
      className={`px-4 py-2 font-medium text-xs rounded-lg transition ${
        completedQuests.includes('plant-tree')
          ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
          : 'bg-emerald-600 text-white hover:bg-emerald-700'
      }`}
    >
      {completedQuests.includes('plant-tree') ? 'Completed ✓' : 'Complete'}
    </button>
  </div>
</div>
</div>
)}

{activeTab === 'quiz' && (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="text-xl font-bold text-slate-800">🧠 Eco-Quizzes</h2>
    <p className="text-slate-600">Test your environmental knowledge!</p>
    <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
      <p className="font-semibold text-slate-800">Q1: Which of the following reduces plastic waste the most?</p>
      <div className="space-y-2">
        <button className="w-full text-left p-3 border rounded-lg bg-white hover:bg-emerald-50 transition-colors">A) Using single-use plastic cups</button>
        <button className="w-full text-left p-3 border rounded-lg bg-white hover:bg-emerald-50 transition-colors">B) Carrying a reusable cloth bag</button>
        <button className="w-full text-left p-3 border rounded-lg bg-white hover:bg-emerald-50 transition-colors">C) Burning plastic trash</button>
      </div>
    </div>
  </div>
)}

{activeTab === 'leaderboard' && (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="text-xl font-bold text-slate-800">🏆 Student Leaderboard</h2>
    <div className="divide-y">
      <div className="py-3 flex justify-between items-center font-semibold text-slate-700">
        <span>#1 Aarav Sharma</span>
        <span className="text-emerald-600">450 Points</span>
      </div>
      <div className="py-3 flex justify-between items-center text-slate-600">
        <span>#2 Ananya Rao</span>
        <span className="text-emerald-600">380 Points</span>
      </div>
      <div className="py-3 flex justify-between items-center text-slate-600">
        <span>#3 Rohan Mehta</span>
        <span className="text-emerald-600">310 Points</span>
      </div>
    </div>
  </div>
)}

{activeTab === 'admin' && (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="text-xl font-bold text-slate-800">👩‍🏫 Teacher Portal</h2>
    <p className="text-slate-600">Manage classroom assignments and view student progress.</p>
    <div className="p-4 border rounded-xl bg-slate-50">
      <p className="font-medium text-slate-700">Classroom: Greenwood High - Grade 8</p>
      <p className="text-sm text-slate-500">Total Active Students: 28</p>
    </div>
  </div>
 
)}
</main>
{/* FLOATING AI ECO-MENTOR WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {aiOpen && (
          <div className="mb-3 w-80 p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xl">
            <div className="flex items-center justify-between mb-2 pb-2 border-b">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h4 className="font-bold text-slate-800 text-sm">AI Eco-Mentor</h4>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{aiTip}</p>
            <button 
              onClick={() => setAiTip("Great job on your quests today! Try taking shorter showers to conserve water next.")} 
              className="mt-3 w-full py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition"
            >
              Ask AI for Next Tip ✨
            </button>
          </div>
        )}
        <button 
          onClick={() => setAiOpen(!aiOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 transition"
        >
          <span>🤖</span>
          <span className="text-sm">AI Eco-Mentor</span>
        </button>
      </div>
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