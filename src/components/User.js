import React from 'react';
import Date from './Date';
import '../styles/styles.css';

const User = (props) => {
    return (
        <div className="widget__message">
            <h3 className="widget__message--title">{props.lastname}, {props.firstname}</h3>
            {
                    props.missingDates === 0 ? ( 
                        <div>
                            No results.
                        </div>
                    ) : (
                        props.missingDates.map((date) => <Date key={date} date={date} />)
                    )
                }
        </div>
    );
};

export default User;