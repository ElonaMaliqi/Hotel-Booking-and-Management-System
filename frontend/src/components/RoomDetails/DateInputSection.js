
import React from 'react';
import './DateInputSection.scss';

function DateInputSection({ checkinDate, checkoutDate, setCheckinDate, setCheckoutDate }) {
    return (
        <div className="date-input-section">
            <div className="date-field">
                <label htmlFor="checkin">Check-in Date</label>
                <input
                    type="date"
                    id="checkin"
                    value={checkinDate}
                    onChange={(e) => setCheckinDate(e.target.value)}
                    required
                />
            </div>
            <div className="date-field">
                <label htmlFor="checkout">Check-out Date</label>
                <input
                    type="date"
                    id="checkout"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}

export default DateInputSection;
