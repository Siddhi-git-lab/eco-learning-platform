export const initialUserData = {
  name: "Aarav Sharma",
  school: "Greenwood High School",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aarav",
  points: 450,
  streakDays: 5,
  level: 3,
  co2SavedKg: 12.5,
  treesPlanted: 3,
};

export const sampleBadges = [
  { id: 1, name: "Waste Warrior", icon: "♻️", unlocked: true, desc: "Recycled 5kg of waste" },
  { id: 2, name: "Tree Planter", icon: "🌱", unlocked: true, desc: "Planted 3 saplings" },
  { id: 3, name: "Energy Saver", icon: "⚡", unlocked: false, desc: "Saved 20 kWh of electricity" },
  { id: 4, name: "Eco Scholar", icon: "📚", unlocked: false, desc: "Scored 100% in 5 quizzes" },
];
export const sampleQuizzes = [
  {
    id: 1,
    question: "Which of these gases is the primary contributor to global warming?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    pointsReward: 50
  },
  {
    id: 2,
    question: "What is the most abundant renewable energy source on Earth?",
    options: ["Wind Energy", "Solar Energy", "Geothermal Energy", "Hydropower"],
    correctAnswer: "Solar Energy",
    pointsReward: 50
  }
];