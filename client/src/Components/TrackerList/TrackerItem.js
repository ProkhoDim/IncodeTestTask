import React from 'react';

// {
//     "ticker": "AAPL",
//     "exchange": "NASDAQ",
//     "price": 279.29,
//     "change": 64.52,
//     "change_percent": 0.84,
//     "dividend": 0.56,
//     "yield": 1.34,
//     "last_trade_time": "2021-04-30T11:53:21.000Z"
//   }

const TrackerItem = () => {
  return (
    <>
      <li>
        <span>{ticker}</span>
        <span>{exchange}</span>
        <span></span>
      </li>
    </>
  );
};

export default TrackerItem;
