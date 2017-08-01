import React from 'react';
import ReactDOM from 'react-dom';
import Status from './components/status.jsx';
// import List from './components/list.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user1: 'this will be null later',
      user2: 'this will also be null later',

    }

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
