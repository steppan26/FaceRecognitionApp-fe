import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) =>{
    const capName = name[0].toUpperCase() + name.slice(1)

    return(
        <div style={{padding: "2em 2em 0 2em"}}>
            <div className="rankText">
                <h3 className="userName">{capName},</h3>
                <div style={{padding: "0", fontSize: "1.5rem"}}>"your current entry count is ..."</div>
            </div>
            <div className="rankValue">
                {entries}
            </div>
        </div>
    );
}
export default Rank;