import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-content'>
                    <div className='list'>
                        <h3>Support</h3>
                        <p>Manage your rooms</p>
                        <p>Hotel help center</p>
                        <p>Safety Resource Center</p>
                    </div>

                    <div className='list'>
                        <h3>Discover</h3>
                        <p>Genius loyalty program</p>
                        <p>Seasonal and holiday deals</p>
                        <p>Hotel articles</p>
                    </div>

                    <div className='list'>
                        <h3>Terms and settings</h3>
                        <p>Privacy & cookies</p>
                        <p>Terms & conditions</p>
                        <p>Partner disputer</p>
                    </div>
                </div>
                <div className='copyrights'>
                    <p>Copyright © 2024 BreezeHotel.com™. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer