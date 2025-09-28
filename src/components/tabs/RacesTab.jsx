import React, { useState, useEffect } from 'react';
import RaceListSidebar from '../RaceListSidebar';
import MainContent from '../MainContent';
import StatsSidebar from '../StatsSidebar';
import { sundayRaceData, getRaceStats } from '../../data/sundayRaces';
import { getTopJockeys } from '../../data/jockeyData';

const RacesTab = () => {
    const [races, setRaces] = useState(sundayRaceData);
    const [selectedRace, setSelectedRace] = useState(sundayRaceData[0]);
    const [jockeyStats, setJockeyStats] = useState([]);
    const [raceStats, setRaceStats] = useState(getRaceStats());

    useEffect(() => {
        // Load real jockey statistics
        loadJockeyStats();
    }, [races]);

    const loadJockeyStats = () => {
        // Get top 6 jockeys from real data
        const topJockeys = getTopJockeys(6);
        setJockeyStats(topJockeys);
    };

    const handleRefresh = () => {
        loadJockeyStats();
        console.log('Race data refreshed');
    };

    // Show stats overview
    const StatsOverview = () => (
        <div className="stats-overview">
            <div className="stat-card">
                <div className="stat-icon">🏁</div>
                <div className="stat-info">
                    <div className="stat-value">{raceStats.totalRaces}</div>
                    <div className="stat-label">Races Today</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">🐎</div>
                <div className="stat-info">
                    <div className="stat-value">{raceStats.totalHorses}</div>
                    <div className="stat-label">Horses Running</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="tab-content-container">
            <StatsOverview />
            <div className="races-layout">
                <RaceListSidebar
                    races={races}
                    selectedRace={selectedRace}
                    onRaceSelect={setSelectedRace}
                />
                <MainContent selectedRace={selectedRace} />
                <StatsSidebar
                    jockeyStats={jockeyStats}
                    onRefresh={handleRefresh}
                />
            </div>
        </div>
    );
};

export default RacesTab;