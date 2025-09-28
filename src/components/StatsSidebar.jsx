import React from 'react';
import JockeyLeaderboard from './JockeyLeaderboard';
import TrackInfo from './TrackInfo';
import RefreshSection from './RefreshSection';

const StatsSidebar = ({ jockeyStats, onRefresh }) => (
    <div className="stats-panel">
        <JockeyLeaderboard jockeyStats={jockeyStats} />
        <TrackInfo />
        <RefreshSection onRefresh={onRefresh} />
    </div>
);

export default StatsSidebar;