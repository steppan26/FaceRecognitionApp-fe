import React from 'react';
import './Rank.css'

const Rank = () =>{
    return(
        <div>
            <div className="rankText">
                {"Stephane, your current rank is ..."}
            </div>
            <div className="rankValue">
                {"#5"}
            </div>
        </div>
    );
}
export default Rank;