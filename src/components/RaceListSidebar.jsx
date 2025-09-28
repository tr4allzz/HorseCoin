import React from 'react';
import RaceItem from './RaceItem';

const RaceListSidebar = ({ races, selectedRace, onRaceSelect }) => (
    <div className="race-list-sidebar">
        <div className="sidebar-header">
            <div className="sidebar-title">Today's Races</div>
            <div className="race-count">{races.length} scheduled</div>
        </div>
        <div className="race-list">
            {races.map((race, index) => (
                <RaceItem
                    key={race.id}
                    race={race}
                    raceNumber={index + 1}
                    isActive={selectedRace?.id === race.id}
                    onClick={() => onRaceSelect(race)}
                />
            ))}
        </div>
    </div>
);

export default RaceListSidebar;