import React from 'react';
import '../styles/WildfireBackground.css';

const WildfireBackground = () => {
    return (
        <div className="wildfire-background">
            <div className="glow-container">
                <div className="glow"></div>
                <div className="glow-2"></div>
            </div>
            <div className="flames-container">
                <div className="flame flame-1"></div>
                <div className="flame flame-2"></div>
                <div className="flame flame-3"></div>
                <div className="flame flame-4"></div>
                <div className="flame flame-5"></div>
                <div className="flame flame-6"></div>
                <div className="flame flame-7"></div>
                <div className="flame flame-8"></div>
            </div>
            <div className="embers">
                <div className="ember ember-1"></div>
                <div className="ember ember-2"></div>
                <div className="ember ember-3"></div>
                <div className="ember ember-4"></div>
                <div className="ember ember-5"></div>
            </div>
            <div className="smoke smoke-1"></div>
            <div className="smoke smoke-2"></div>
            <div className="smoke smoke-3"></div>
        </div>
    );
};

export default WildfireBackground;
