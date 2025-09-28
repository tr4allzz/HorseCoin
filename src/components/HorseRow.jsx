import React from 'react';

const HorseRow = ({ horse, isFavorite }) => {
    const winPercentage = horse.total_races > 0 ?
        ((horse.won_races / horse.total_races) * 100).toFixed(1) : '0.0';

    return (
        <tr className={`horse-row ${isFavorite ? 'favorite' : ''}`}>
            <td className="col-number">
                <div className="horse-number">{horse.start_position}</div>
            </td>
            <td className="col-horse">
                <div className="horse-info">
                    <div className="horse-name">{horse.horse_name}</div>
                    <div className="horse-details">
                        {horse.horse_age}yo {horse.sex}
                    </div>
                </div>
            </td>
            <td className="col-stats">
                <div className="race-stats">
                    <div className="wins-races">{horse.won_races}/{horse.total_races}</div>
                    <div className="win-rate">{winPercentage}% wins</div>
                </div>
            </td>
            <td className="col-earnings">
                <div className="earnings-amount">
                    {horse.career_earnings_pln.toLocaleString()} PLN
                </div>
            </td>
            <td className="col-odds">
                <div className={`odds-display ${isFavorite ? 'favorite' : ''}`}>
                    {horse.our_odds}
                </div>
            </td>
            <td className="col-assessment">
                <div className="trainer-assessment">
                    {horse.trainer_assessment || 'No assessment available'}
                </div>
            </td>
        </tr>
    );
};

export default HorseRow;