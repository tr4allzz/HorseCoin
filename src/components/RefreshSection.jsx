import React from 'react';

const RefreshSection = ({ onRefresh }) => (
    <div className="stats-section">
        <button className="refresh-btn" onClick={onRefresh}>
            Refresh Data
        </button>
        <div className="refresh-note">
            Data updates automatically every 10 minutes
        </div>
    </div>
);

export default RefreshSection;