import React from 'react';

const RaceItem = ({ race, raceNumber, isActive, onClick }) => (
    <button
        className={`race-item ${isActive ? 'active' : ''}`}
        onClick={onClick}
    >
        <div className="race-header">
            <div className="race-number">{raceNumber}</div>
            <div className="race-time">{race.time}</div>
        </div>
        <div className="race-title">{race.title}</div>
        <div className="race-meta">
            <span className="race-distance">{race.distance}</span>
            <span className="race-prize">{race.prize}</span>
        </div>
        <div className={`surface-badge ${race.surface.toLowerCase().replace('-', '')}`}>
            {race.surface}
        </div>
    </button>
);

export default RaceItem;