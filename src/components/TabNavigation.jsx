import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
    <div className="tab-navigation">
        <div className="tab-nav-container">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </div>
    </div>
);

export default TabNavigation;