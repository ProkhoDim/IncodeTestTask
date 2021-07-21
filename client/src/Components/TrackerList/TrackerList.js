import React from 'react';


const TrackerList = () => {
    return ( <>
        <ul>
            {TrackerList.map((item)=> <TrackerItem data={item}/>)}
        </ul>
    </> );
}
 
export default TrackerList;