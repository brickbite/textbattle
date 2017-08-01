import React from 'react';
import ReactDOM from 'react-dom';
import Create from './components/create.jsx';
import Status from './components/status.jsx';
import List from './components/list.jsx';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [{name: 'CharSlot1', maxhitpoints: 20, attackpower: 5, armor: 2},
        {name: 'CharSlot2', maxhitpoints: 20, attackpower: 5, armor: 2}]
      
    }

    this.getAllUserData.bind(this);
  }

  getAllUserData() {
    // console.log('Client: getAllUserData invoked');
    // axios.get('/users')
    //   .catch( err => {console.log('Client: getAllUserData Error: ', err ) })
    //   .then( (response) => {
    //     console.log('Client: getAllUserData receieved ', response);
    //     // this.setState({
    //     //   user1: response[0]
    //     // })
    //   } )
  }


  componentDidMount() {
    console.log('Client: mounted.');
    // this.getAllUserData();
  }

  render () {
    return (
      <div>
        <h1>Title Text</h1>
        Something appeared!
        <br></br>
        <div>{this.state.user1}</div>
        <div>{this.state.user2}</div>
        <Create />
        <Status usernum={this.state.users[0]} />
        <Status usernum={this.state.users[1]} />
        <List />
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('app'));
