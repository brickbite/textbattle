import React from 'react';
import ReactDOM from 'react-dom';
import Status from './components/status.jsx';
// import List from './components/list.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user1: 'this will be null later',
      user2: 'this will also be null later',
      
    }

    this.getAllUserData.bind(this);
  }

  getAllUserData() {
    console.log('Client: getAllUserData invoked');
    axios.get('/users')
      .then( (response) => { console.log('Client: getAllUserData receieved ', response) } )
      .catch( err => {console.log('Client: getAllUserData Error: ', err ) });
  }


  componentDidMount() {
    console.log('Client: mounted.');
    this.getAllUserData();
  }

  render () {
    return (
      <div>
        <h1>Title Text</h1>
        Something appeared!
        <br></br>
        <input className="nameentry"/>
        <button type="button">CLICK HERE</button>
        <br></br>
        <div>{this.state.user1}</div>
        <div>{this.state.user2}</div>
        <Status user1={this.state.user1} user2={this.state.user2} />
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('app'));
