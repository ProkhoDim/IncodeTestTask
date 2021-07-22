import React from 'react';
import TrackerItem from './TrackerItem';
import styles from './TickerList.module.css';

const TrackerList = ({ trackerList }) => {
  return (
    <>
      <table className={styles.tickerList}>
        <thead>
          <tr>
            <td>Ticker Name</td>
          </tr>
        </thead>
        <tbody>
          {trackerList.map((item) => (
            <TrackerItem key={item.ticker} data={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TrackerList;
