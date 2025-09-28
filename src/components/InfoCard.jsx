import React from 'react';

const InfoCard = ({ label, value }) => (
    <div className="info-card">
        <div className="info-label">{label}</div>
        <div className="info-value">{value}</div>
    </div>
);

export default InfoCard;