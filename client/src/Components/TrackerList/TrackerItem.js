import React from 'react';
import styles from './TrackerItem.module.css';

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

const TrackerItem = ({
  data: {
    ticker,
    color,
    exchange,
    price,
    change,
    change_percent,
    dividend,
    yield: _yield,
    last_trade_time,
  },
}) => {
  return (
    <>
      <tr className={styles.listItem}>
        <td
          className={(styles.ticker, styles.itemTd)}
          style={{ backgroundColor: color }}
        >
          {ticker}
        </td>
        <td className={styles.exchange}>{exchange}</td>
        <td className={styles.itemTd}>{price} </td>
        <td className={styles.itemTd}>{change} </td>
        <td className={styles.itemTd}>{change_percent} </td>
        <td className={styles.itemTd}>{dividend} </td>
        <td className={styles.itemTd}>{_yield} </td>
        <td className={styles.itemTd}>{last_trade_time} </td>
      </tr>
    </>
  );
};

export default TrackerItem;
