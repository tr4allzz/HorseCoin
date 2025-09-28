import React from 'react';
import HorseRow from './HorseRow';

const HorsesSection = ({ horses }) => {
    const totalPrizeAmount = horses.length > 0 ?
        horses.reduce((sum, horse) => sum + (horse.career_earnings_pln || 0), 0) : 0;

    return (
        <div className="horses-section">
            <div className="section-header">
                <h2 className="section-title">Field & Runners</h2>
                <div className="section-stats">
                    <span className="horse-count">{horses.length} Runners</span>
                    {horses.length > 0 && (
                        <span className="total-earnings">
                            Total Field Earnings: {totalPrizeAmount.toLocaleString()} PLN
                        </span>
                    )}
                </div>
            </div>
            {horses.length > 0 ? (
                <div className="horses-table-container">
                    <table className="horses-table">
                        <thead className="table-header">
                        <tr>
                            <th className="col-number">#</th>
                            <th className="col-horse">Horse</th>
                            <th className="col-stats">Record</th>
                            <th className="col-earnings">Earnings</th>
                            <th className="col-odds">Our Odds</th>
                            <th className="col-assessment">Trainer Assessment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {horses.map((horse) => (
                            <HorseRow
                                key={horse.start_position}
                                horse={horse}
                                isFavorite={parseInt(horse.our_odds) > 50}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">🐎</div>
                    <div className="empty-state-title">No horses available</div>
                    <div className="empty-state-description">
                        Horse information will be available closer to race time
                    </div>
                </div>
            )}
        </div>
    );
};

export default HorsesSection;