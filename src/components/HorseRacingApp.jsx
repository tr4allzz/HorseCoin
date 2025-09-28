import React, { useState } from 'react';
import Header from './Header';
import TabNavigation from './TabNavigation';
import RacesTab from './tabs/RacesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import './HorseRacingApp.css';

const HorseRacingApp = () => {
    const [activeTab, setActiveTab] = useState('races');

    const tabs = [
        { id: 'races', label: 'Live Races', icon: '🏁' },
        { id: 'analytics', label: 'Analytics', icon: '📈' }
    ];

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'races':
                return <RacesTab />;
            case 'analytics':
                return <AnalyticsTab />;
            default:
                return <RacesTab />;
        }
    };

    return (
        <div className="app-container">
            <Header
                currentDate={getCurrentDate()}
            />

            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};


export default HorseRacingApp;