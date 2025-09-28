import React from 'react';

const JockeyLeaderboard = ({ jockeyStats }) => (
    <div className="stats-section">
        <h3 className="stats-title">Top Performers Today</h3>
        <div className="jockey-list">
            {jockeyStats.length > 0 ? jockeyStats.map((jockey, index) => (
                <div key={jockey.name} className="jockey-item">
                    <div className="jockey-rank">{index + 1}</div>
                    <div className="jockey-info">
                        <div className="jockey-name">{jockey.name}</div>
                        <div className="jockey-stats">
                            {jockey.wins} wins • {jockey.winRate}% • {jockey.earnings.toLocaleString()} PLN
                        </div>
                    </div>
                </div>
            )) : (
                <div className="empty-stats">
                    <div className="empty-stats-text">Statistics will be updated based on race results</div>
                </div>
            )}
        </div>
    </div>
);

export default JockeyLeaderboard;