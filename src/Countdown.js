import React, { useState, useEffect } from 'react';
import './Countdown.css';
import logo from './YCLogo.png';  // Ensure the logo path is correct

const Countdown = () => {
  
  // State to keep track of the time left
  const [timeLeft, setTimeLeft] = useState({
    whole: '', 
    fraction: '', 
    hours: '', 
    minutes: ''
  });

  useEffect(() => {
    // Set the end date and time
    const countDownDate = new Date('April 22, 2024 19:59:59 GMT-0700').getTime();

    // Update the count down every second
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the time left between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, and minutes
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      // Output the result in the state
      setTimeLeft({ 
        whole: days.toString(), 
        fraction: ((distance / (1000 * 60 * 60 * 24) - days) * 10000000).toFixed(0),
        hours: hours.toString(), 
        minutes: minutes.toString()
      });

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ whole: '0', fraction: '0000000', hours: '0', minutes: '0' });
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
      <div className="additional-info">
        {timeLeft.whole} days {timeLeft.hours} hours {timeLeft.minutes} minutes
      </div>
      <div className="disclaimer">Unofficial app</div>
    </div>
  );
};

export default Countdown;
