import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';

import OpenAccount from '../OpenAccount';
import StockChart from '../stockChart';

function HomePage() {
    return (
        <>
            <Hero />
            <div className="container mt-5 mb-5 p-5 bg-light border rounded">
                <h2 className="text-center mb-4" style={{ fontWeight: 300 }}>Market Snapshot: Reliance Industries</h2>
                <StockChart symbol="RELIANCE.NS" />
            </div>
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
        </>
    );
}

export default HomePage;
