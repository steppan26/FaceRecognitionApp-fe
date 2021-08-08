import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) =>{
    const capName = name[0].toUpperCase() + name.slice(1)

    return(
        <div>
            <div className="rankText">
                {`${capName}, your current entry count is ...`}
            </div>
            <div className="rankValue">
                {entries}
            </div>
        </div>
    );
}
export default Rank;