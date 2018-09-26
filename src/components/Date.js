import React from 'react';
import moment from 'moment';

const Date = (props) => {
    return (
        <div>
            <div className="widget__message--tight">{moment(props.date).format('ddd - M/D/YY')}</div>
        </div>
    );
};

export default Date;