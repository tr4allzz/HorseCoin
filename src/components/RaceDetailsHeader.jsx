import React from 'react';
import InfoCard from './InfoCard';

const RaceDetailsHeader = ({ race }) => {
    // Extract main prize amount and format it
    const formatPrizeAmount = (prizeString) => {
        const match = prizeString.match(/([\d,]+)\s*PLN/);
        if (match) {
            const amount = parseInt(match[1].replace(/,/g, ''));
            return {
                main: `${amount.toLocaleString()} PLN`,
                breakdown: prizeString.includes('(') ?
                    prizeString.substring(prizeString.indexOf('(')) : null
            };
        }
        return { main: prizeString, breakdown: null };
    };

    const prizeInfo = formatPrizeAmount(race.prize);

    return (
        <div className="race-details-header">
            <h1 className="race-title-main">{race.title}</h1>
            {race.description && (
                <p className="race-description">{race.description}</p>
            )}
            <div className="race-info-grid">
                <InfoCard label="Post Time" value={race.time} />
                <InfoCard label="Distance" value={race.distance} />
                <div className="prize-card">
                    <div className="info-card-label">Total Prize</div>
                    <div className="prize-main">{prizeInfo.main}</div>
                    {prizeInfo.breakdown && (
                        <div className="prize-breakdown">{prizeInfo.breakdown}</div>
                    )}
                </div>
                <InfoCard label="Surface" value={race.surface} />
                {race.category && (
                    <InfoCard label="Category" value={race.category} />
                )}
                {race.entry_fee && (
                    <InfoCard label="Entry Fee" value={race.entry_fee} />
                )}
            </div>
        </div>
    );
};

export default RaceDetailsHeader;