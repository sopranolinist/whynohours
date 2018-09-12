import React from 'react';
import UsersList from './UsersList';
import '../styles/styles.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="header__title">{this.props.componentName}</div>
                        <div className="warning">NOTE: app currently uses a CORS proxy to access the Harvest API server</div>
                    </div>                   
                </div> 
                <UsersList />
            </div>
        );
    }  
}

App.defaultProps = {
    componentName: 'Why No Hours?'
    // users: [
    //     {id: '1', firstname: 'Jen', lastname: 'Lindsay'},
    //     {id: '2', firstname: 'Jon', lastname: 'DeArmas'},
    //     {id: '3', firstname: 'Stephen', lastname: 'Grider'},
    //     {id: '4', firstname: 'Carmen', lastname: 'SanDiego'}
    // ]
};

export default App;