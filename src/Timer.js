import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(50);
  const [minutes, setMinutes] = useState(4);
  const [countDown, setCountDown] = useState(false);
  const [bounties, setBounties] = useState(false);
  const [campStack, setCampStack] = useState(false);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(50);
    setMinutes(4);
    setIsActive(false);
    setBounties(false)
    setCountDown(false)
    setCampStack(false)
  }

  useEffect(() => {
    let interval = null;
    if ((minutes + 1) % 5 === 0 && minutes !== 0 && seconds > 30) {
      setBounties(true)
    }
    if ((minutes + 1) % 5 === 0 && seconds > 49) {
      setCountDown(true)
    }
    if (minutes % 5 === 0) {
      setBounties(false)
      setCountDown(false)
    }
    if (seconds > 39 && minutes > 0 && (minutes + 1) % 5 !== 0) {
      setCampStack(true)
    }
    if (campStack && seconds === 50) {
      setCountDown(true)
    }
    if (isActive && seconds === 60) {
      setSeconds(0);
      setMinutes(minutes + 1)
    }

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

    } else if (!isActive && seconds !== 0) {

      clearInterval(interval);

    }
    return () => clearInterval(interval);

  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">
        <h3 className="timer">{minutes}:{seconds}</h3>
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <h1 className="warning">{bounties ? 'Bounty Warning!!' : ''}</h1>
      <h1 className="warning">{campStack ? 'Prepare To Stack!!' : ''}</h1>
      <h1 className="count-down">{countDown ? 60 - seconds : ''}</h1>
    </div>
  );
};

export default Timer;