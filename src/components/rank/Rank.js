import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) =>{
    return(
        <div>
            <div className="rankText">
                {`${name}, your current entry count is ...`}
            </div>
            <div className="rankValue">
                {entries}
            </div>
        </div>
    );
}
export default Rank;