import React from 'react';

function Footer() {
    return (
        <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
            <div className='container border-top mt-5'>
                <div className='row mt-5'>
                    <div className='col'>
                        <img src='media/images/logo.svg' style={{ width: "50%" }} />
                        <p>
                            &copy; 2010 - 2026, Not Zerodha Broking Ltd. All rights Reserved. </p>
                        <div className='d-flex gap-3'>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-telegram"></i>
                        </div>
                    </div>
                    <div className='col'>
                        <p className='text-muted' style={{ fontSize: "20px" }}>Company</p>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>About</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Products</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Pricing</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Referral programme</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Careers</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Zerodha.tech</a>
                        <a href="" className='d-block text-muted text-decoration-none'>Press & media</a>
                        <a href="" className='d-block text-muted text-decoration-none'>Zerodha cares (CSR)</a>
                    </div>

                    <div className='col mb-5'>
                        <p className='text-muted' style={{ fontSize: "20px" }} >Support</p>
                        <a href="" className='d-block text-muted text-decoration-none mb-3'>Contact</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-3'>Support portal</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-3'>Z-Connect Blog</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-3'>List of Charges</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-3'>Downloads & resources</a>
                    </div>

                    <div className='col mb-5'>
                        <p className='text-muted' style={{ fontSize: "20px" }}>Account</p>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Open An Account</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>Fund Transfer</a>
                        <a href="" className='d-block text-muted text-decoration-none mb-2'>60 Day Challenge</a>
                    </div>

                </div>

                <div className='mt-5 text-muted' style={{ fontSize: "14px" }}>
                    <p>
                        Zerodha Broking Ltd: Member of NSE & BSE - SEBI Registration no : INZ000031633
                        CDSL: Depository services through Zerodha Securities Pvt. Ltd. - SEBI Registration no.:
                        IN-DP-100-2015 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025 - SEBI
                        Cross, Dollars Colony, Opp. Clarence Public School, J.P. Nagar, 4th Phase, Bengaluru -
                        560078, Karnataka, India. For any complaints pertaining to securities broking please
                        write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you
                        carefully read the Risk Disclosure Documents as prescribed by SEBI | ICF
                    </p>

                    <p>
                        Procedure to file a complaint on SEBI SCORES: Register on SCORES
                        portal. Mandatory details for filing complaints on SCORES: Name,
                        PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
                        Communication, Speedy redressal of the grievances
                    </p>

                    <p>
                        Investments in securities market are subject to market risks; read
                        all the related documents carefully before investing.
                    </p>

                    <p>
                        "Prevent unauthorised transactions in your account. Update your
                        mobile numbers/email IDs with your stock brokers. Receive
                        information of your transactions directly from Exchange on your
                        mobile/email at the end of the day. Issued in the interest of
                        investors. KYC is one time exercise while dealing in securities
                        markets - once KYC is done through a SEBI registered intermediary
                        (broker, DP, Mutual Fund etc.), you need not undergo the same
                        process again when you approach another intermediary." Dear
                        Investor, if you are subscribing to an IPO, there is no need to
                        issue a cheque. Please write the Bank account number and sign the
                        IPO application form to authorize your bank to make payment in case
                        of allotment. In case of non allotment the funds will remain in your
                        bank account. As a business we don't give stock tips, and have not
                        authorized anyone to trade on behalf of others. If you find anyone
                        claiming to be part of Zerodha and offering such services, please
                        create a ticket here.
                    </p>
                    <div className='mt-4 d-flex justify-content-center flex-wrap gap-4'>
                        <a href="" className='text-muted text-decoration-none'>NSE</a>
                        <a href="" className='text-muted text-decoration-none'>BSE</a>
                        <a href="" className='text-muted text-decoration-none'>MCX</a>
                        <a href="" className='text-muted text-decoration-none'>Terms & Conditions</a>
                        <a href="" className='text-muted text-decoration-none'>Policies & Procedures</a>
                        <a href="" className='text-muted text-decoration-none'>Privacy Policy</a>
                        <a href="" className='text-muted text-decoration-none'>Disclosure</a>
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;