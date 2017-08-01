import React from 'react';
import axios from 'axios';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // slotnumber: this.props.number,
      charLoadedState: false,
      currentHP: this.props.usernum.maxhitpoints,
      nameentrytext: null
      
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleSubmit() {
    console.log('Status: handleSubmit invoked for: ', this.state.nameentrytext);

    axios.get('/users', {name: this.state.nameentrytext})
      .catch( err => {console.log('Status: GetUser Error: ', err ) })
      .then( (response) => {
        console.log('Status: GetUser receieved ', response);
        this.setState({
          charLoadedState: true,
          currentHP: response.maxhitpoints
        })
      } )
  }

  handleTextChange(event) {
    console.log('handleTextChange invoked', event.target.value);
    console.log('this: ', this);
    this.setState({
      nameentrytext: event.target.value
    })
  }

  componentDidMount() {
    console.log('Status Component mounted for: ', this.props.usernum.name);
  }



  render() {
    if (this.state.charLoadedState) {
      return (
        <div>
          <h2>{this.props.usernum.name}</h2>
          <div>{'HP: ' + this.state.currentHP}</div>
          <div>{'Attack: ' + this.props.usernum.attackpower}</div>
          <div>{'Armor: ' + this.props.usernum.armor}</div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Enter Name</h2>
          <input className="nameentry" onChange={this.handleTextChange} />
          <button type="button" onClick={this.handleSubmit}>Find or Create</button>
        </div>
      )
    }

  }


}

export default Status
