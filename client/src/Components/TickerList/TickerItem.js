import React from 'react';
import styles from './TickerItem.module.css';

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

const TickerItem = ({
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
        <td className={(styles.ticker, styles.itemTd, styles.tickerName)}>
          <div style={{ backgroundColor: color }} className={styles.tickerWrap}>
            {ticker}
          </div>
        </td>
        <td className={(styles.exchange, styles.itemTd)}>
          <div>{exchange}</div>
        </td>
        <td className={styles.itemTd}>
          <div>{price}</div>
        </td>
        <td className={styles.itemTd}>
          <div>{change}</div>
        </td>
        <td className={styles.itemTd}>
          <div>{change_percent}</div>
        </td>
        <td className={styles.itemTd}>
          <div>{dividend}</div>
        </td>
        <td className={styles.itemTd}>
          <div>{_yield}</div>
        </td>
      </tr>
    </>
  );
};

export default TickerItem;
