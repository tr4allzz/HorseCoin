import React from 'react';
import RaceDetailsHeader from './RaceDetailsHeader';
import HorsesSection from './HorsesSection';

const MainContent = ({ selectedRace }) => {
    if (!selectedRace) {
        return (
            <div className="race-details">
                <div className="empty-state">
                    <div className="empty-state-icon">🏇</div>
                    <div className="empty-state-title">Select a Race</div>
                    <div className="empty-state-description">
                        Choose a race from the schedule to view detailed information
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="race-details">
            <RaceDetailsHeader race={selectedRace} />
            <HorsesSection horses={selectedRace.horses || []} />
        </div>
    );
};

export default MainContent;