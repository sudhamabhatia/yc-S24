import React, { useState, useEffect } from 'react';
import './Countdown.css';
import logo from './YCLogo.png'; // Make sure the path is correct

const Countdown = () => {
  
  // State to keep track of the time left
  const [timeLeft, setTimeLeft] = useState({ whole: '', fraction: '' });

  useEffect(() => {
    // Set the end date and time
    const countDownDate = new Date('April 22, 2024 19:59:59 GMT-0700').getTime();

    // Update the count down every second
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the time left between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days
      const days = (distance / (1000 * 60 * 60 * 24)).toFixed(7);
      const parts = days.split('.');

      // Output the result in the state
      setTimeLeft({ whole: parts[0], fraction: parts[1] });

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ whole: '0', fraction: '0000000' });
      }
    }, 100);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <img src={logo} alt="Logo" className="logo" />
      <span className="countdown-text">
        {timeLeft.whole}<sup>.{timeLeft.fraction}</sup>
      </span>
      <span className="label">days to S24 Application Deadline</span>
      <div className="disclaimer">Unofficial app</div>
    </div>
    
  );
};

export default Countdown;
