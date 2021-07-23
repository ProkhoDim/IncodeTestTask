import React from 'react';
import TickerItem from './TickerItem';
import styles from './TickerList.module.css';

const TickerList = ({ trackerList }) => {
  return (
    <>
      <table className={styles.tickerList}>
        <thead className={styles.tickerListThRow}>
          <tr>
            <td className={styles.theadTd}>Ticker</td>
            <td className={styles.theadTd}>Exchange</td>
            <td className={styles.theadTd}>Price</td>
            <td className={styles.theadTd}>Change</td>
            <td className={styles.theadTd}>Change %</td>
            <td className={styles.theadTd}>Dividend</td>
            <td className={styles.theadTd}>Yield</td>
          </tr>
        </thead>
        <tbody>
          {trackerList.map((item) => (
            <TickerItem key={item.ticker} data={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TickerList;
