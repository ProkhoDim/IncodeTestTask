import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState(0);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', data => {
      setData(data);
    });
  }, []);

  const changeInterval = () => {
    console.log('send');
    socket.emit('change-interval', input);
  }

  // useEffect(() => {
  //   socket.on('ticker', data => {
  //     setData(prevState => prevState++)
  //     console.log(data)});
  // }, [data]);
  return (
    <div className="App">
      <div>{JSON.stringify(data)}</div>
      <div>
        <input
          type="number"
          value={input}
          onInput={({ target: { value } }) => {
            setInput(Number(value));
          }}
        ></input>
        <button onClick={() => changeInterval()}>Send</button>
      </div>
    </div>
  );
}

export default App;
