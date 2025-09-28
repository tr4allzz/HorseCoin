import React from 'react';

const Header = ({ currentDate }) => (
    <header className="header">
        <div className="header-content">
            <div className="logo">
                <div className="logo-text">Polish Horse Racing</div>
            </div>
            <div className="header-meta">
                <div className="date-info">
                    <span>{currentDate}</span>
                </div>
            </div>
        </div>
    </header>
);

export default Header;