import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      something: 'something one',
      something2: 'something two'
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
        <div>{this.state.something}</div>
        <div>{this.state.something2}</div>
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('app'));
