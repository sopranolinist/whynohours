import React from 'react';
import Date from './Date';
import '../styles/styles.css';

class User extends React.Component {
    state = {
        expanded: false
    };
    onExpand = () => {
        this.setState(() => ({ expanded: !this.state.expanded }));
    }

    render() {
        return (           
            <div className="widget__message--compact">
                <button className="button--compact" onClick={this.onExpand}>{this.state.expanded ? '-' : '+'}</button>
                <label className="widget__message--title--compact">{this.props.lastname}, {this.props.firstname}</label>
                {   this.state.expanded &&
                    (
                        this.props.missingDates === 0 ? ( 
                            <div>
                                No results.
                            </div>
                        ) : (
                            this.props.missingDates.map((date) => <Date key={date} date={date} />)
                        )
                    )
                }
            </div>          
        );
    }
}

export default User;