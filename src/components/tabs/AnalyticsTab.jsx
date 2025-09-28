import React from 'react';

const AnalyticsTab = () => {
    return (
        <div className="tab-content-container">
            <div className="analytics-layout">
                <div className="analytics-header">
                    <h1 className="analytics-title">Race Analytics</h1>
                    <p className="analytics-description">
                        Comprehensive analysis and insights from race data
                    </p>
                </div>

                <div className="analytics-grid">
                    <div className="analytics-card">
                        <div className="analytics-card-header">
                            <h3 className="analytics-card-title">Performance Metrics</h3>
                            <span className="analytics-card-icon">📈</span>
                        </div>
                        <div className="analytics-card-content">
                            <div className="metric-placeholder">
                                Win rate analysis, earnings tracking, and performance trends will be displayed here when race data is provided.
                            </div>
                        </div>
                    </div>

                    <div className="analytics-card">
                        <div className="analytics-card-header">
                            <h3 className="analytics-card-title">Horse Statistics</h3>
                            <span className="analytics-card-icon">🐎</span>
                        </div>
                        <div className="analytics-card-content">
                            <div className="metric-placeholder">
                                Detailed horse performance statistics, form analysis, and comparison charts.
                            </div>
                        </div>
                    </div>

                    <div className="analytics-card">
                        <div className="analytics-card-header">
                            <h3 className="analytics-card-title">Track Conditions</h3>
                            <span className="analytics-card-icon">🌤️</span>
                        </div>
                        <div className="analytics-card-content">
                            <div className="metric-placeholder">
                                Weather impact, surface conditions, and environmental factors affecting race outcomes.
                            </div>
                        </div>
                    </div>

                    <div className="analytics-card">
                        <div className="analytics-card-header">
                            <h3 className="analytics-card-title">Predictions</h3>
                            <span className="analytics-card-icon">🎯</span>
                        </div>
                        <div className="analytics-card-content">
                            <div className="metric-placeholder">
                                AI-powered race predictions and probability analysis based on historical data.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTab;