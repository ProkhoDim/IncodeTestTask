import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TrackerList from './Components/TickerList/TickerList';

const socket = io.connect('http://localhost:4000');

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(1);
  const [currentInterval, setCurrentInterval] = useState(null);

  useEffect(() => {
    socket.emit('start');
    socket.on('ticker', (data) => {
      setData(data);
    });

    return () => {
      socket.on('disconnect');
    };
  }, []);

  const changeInterval = () => {
    const value = input * 1000;

    socket.emit('change-interval', value);
    setCurrentInterval(input);

    socket.on('valueError', (error) => {
      console.log(error);
      setCurrentInterval(error.value);
    });
  };

  return (
    <div className="appWrap">
      <div className="dateAndTime">
        <div className="date">
          Date: {data.length && data[0].last_trade_time.split('T')[0]}
        </div>
        <div className="time">
          Time:{' '}
          {data.length && data[0].last_trade_time.split('T')[1].split('.')[0]}
        </div>
      </div>
      {data.length && <TrackerList trackerList={data} />}
      <div>
        <label>
          Input interval time in seconds
          <input
            type="range"
            value={input}
            min={1}
            max={10}
            step={1}
            // onBlur={() => changeInterval()}
            onInput={({ target: { value } }) => {
              setInput(Number(value));
              console.log(value);
            }}
          />
        </label>

        <button onClick={() => changeInterval()}>Change Interval</button>
        <span>Current interval: {currentInterval}s</span>
      </div>
    </div>
  );
}

export default App;
