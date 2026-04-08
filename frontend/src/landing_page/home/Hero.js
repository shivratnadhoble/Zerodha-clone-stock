import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero Image' className='mb-5' />
                <h1 className='mt-5 display-4'>Invest in Everything</h1>
                <p className='fs-5 text-muted mb-4'>Online platform to invest in stocks, derivatives, mutual funds, and more </p>
                <Link 
                    to="/signup" 
                    className='btn btn-primary fs-5 mb-5' 
                    style={{ width: "fit-content", margin: "0 auto", padding: "12px 60px" }}
                >
                    Signup Now
                </Link>
            </div>
        </div>
    );
}

export default Hero;