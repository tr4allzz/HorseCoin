export const realJockeyData = [
  { rank: 1, name: 'S.Abaev', place1: 48, place2: 31, place3: 30, place4: 28, place5: 24, totalStarts: 228, winPercentage: 21.05 },
  { rank: 2, name: 'K.Dogdurbek Uulu', place1: 32, place2: 31, place3: 24, place4: 21, place5: 16, totalStarts: 175, winPercentage: 18.29 },
  { rank: 3, name: 'T.Kumarbek Uulu', place1: 27, place2: 18, place3: 19, place4: 25, place5: 27, totalStarts: 174, winPercentage: 15.52 },
  { rank: 4, name: 'E.Zamudin Uulu', place1: 24, place2: 28, place3: 23, place4: 21, place5: 15, totalStarts: 153, winPercentage: 15.69 },
  { rank: 5, name: 'S.Mura', place1: 20, place2: 17, place3: 13, place4: 14, place5: 8, totalStarts: 106, winPercentage: 18.87 },
  { rank: 6, name: 'S.Mazur', place1: 16, place2: 19, place3: 12, place4: 7, place5: 8, totalStarts: 84, winPercentage: 19.05 },
  { rank: 7, name: 'K.Grzybowski', place1: 15, place2: 20, place3: 29, place4: 26, place5: 24, totalStarts: 162, winPercentage: 9.26 },
  { rank: 8, name: 'K.Mazur', place1: 14, place2: 19, place3: 19, place4: 28, place5: 18, totalStarts: 143, winPercentage: 9.79 },
  { rank: 9, name: 'D.Sabatbekov', place1: 12, place2: 12, place3: 16, place4: 15, place5: 12, totalStarts: 99, winPercentage: 12.12 },
  { rank: 10, name: 'A.Reznikov', place1: 10, place2: 11, place3: 9, place4: 11, place5: 20, totalStarts: 110, winPercentage: 9.09 },
  { rank: 11, name: 'B.Kalysbek Uulu', place1: 9, place2: 14, place3: 6, place4: 8, place5: 7, totalStarts: 64, winPercentage: 14.06 },
  { rank: 12, name: 'B.Marat Uulu', place1: 9, place2: 2, place3: 7, place4: 6, place5: 6, totalStarts: 55, winPercentage: 16.36 },
  { rank: 13, name: 'S.Vasyutov', place1: 8, place2: 4, place3: 8, place4: 4, place5: 5, totalStarts: 52, winPercentage: 15.38 },
  { rank: 14, name: 'A.Turgaev', place1: 7, place2: 16, place3: 10, place4: 15, place5: 13, totalStarts: 96, winPercentage: 7.29 },
  { rank: 15, name: 'S.Urmatbek Uulu', place1: 7, place2: 8, place3: 13, place4: 6, place5: 8, totalStarts: 65, winPercentage: 10.77 },
  { rank: 16, name: 'A.Burakiewicz', place1: 6, place2: 0, place3: 2, place4: 2, place5: 5, totalStarts: 27, winPercentage: 22.22 },
  { rank: 17, name: 'M.Zholchubekov', place1: 5, place2: 10, place3: 14, place4: 10, place5: 18, totalStarts: 96, winPercentage: 5.21 },
  { rank: 18, name: 'A.Gil', place1: 4, place2: 6, place3: 7, place4: 6, place5: 7, totalStarts: 65, winPercentage: 6.15 },
  { rank: 19, name: 'J.Odložil', place1: 4, place2: 2, place3: 3, place4: 0, place5: 1, totalStarts: 12, winPercentage: 33.33 },
  { rank: 20, name: 'A.Sienkiewicz', place1: 3, place2: 4, place3: 0, place4: 0, place5: 3, totalStarts: 15, winPercentage: 20.0 }
];

// Helper function to get top performers (for leaderboard)
export const getTopJockeys = (limit = 10) => {
  return realJockeyData.slice(0, limit).map(jockey => ({
    name: jockey.name,
    wins: jockey.place1,
    winRate: jockey.winPercentage.toFixed(1),
    earnings: Math.floor(jockey.place1 * 15000 + jockey.place2 * 8000 + jockey.place3 * 4000), // Estimated earnings
    totalStarts: jockey.totalStarts
  }));
};

// Helper function to get jockey by name
export const getJockeyByName = (name) => {
  return realJockeyData.find(jockey => jockey.name === name);
};

// Helper function to get jockey statistics
export const getJockeyStats = () => {
  const totalJockeys = realJockeyData.length;
  const totalWins = realJockeyData.reduce((sum, jockey) => sum + jockey.place1, 0);
  const totalStarts = realJockeyData.reduce((sum, jockey) => sum + jockey.totalStarts, 0);
  const averageWinRate = (totalWins / totalStarts * 100).toFixed(2);

  return {
    totalJockeys,
    totalWins,
    totalStarts,
    averageWinRate: `${averageWinRate}%`
  };
};