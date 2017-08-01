import React from 'react';
import axios from 'axios';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // slotnumber: this.props.number,
      charLoadedState: false,
      failedSearch: false,
      currentHP: null,
      charName: null,
      charAtk: null,
      charArmor: null,
      charAtkRate: null,
      nameentrytext: null
      
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }


  resetState() {
    console.log('Status: resetState invoked for: ', this.state.nameentrytext);

   this.setState({
      // slotnumber: this.props.number,
      charLoadedState: false,
      failedSearch: false,
      currentHP: null,
      charName: null,
      charAtk: null,
      charArmor: null,
      charAtkRate: null,
      nameentrytext: null
    })
  }


  handleSubmit() {
    console.log('Status: handleSubmit invoked for: ', this.state.nameentrytext);

    axios.get('/users', {params: {name: this.state.nameentrytext}})
      .catch( err => {
        console.log('Status: GetUser Error: ', err );
        this.setState({
          charLoadedState: false
        });
      })
      .then( (response) => {
        console.log('Status: GetUser receieved ', response.data[0]);
        this.setState({
          charLoadedState: true,
          currentHP: response.data[0].maxhitpoints,
          charName: response.data[0].name,
          charAtk: response.data[0].attackpower,
          charArmor: response.data[0].armor,
          charAtkRate: response.data[0].attackrate,
        })
      } )
  }

  handleTextChange(event) {
    // console.log('handleTextChange invoked', event.target.value);
    // console.log('this: ', this);
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
          <h3>{'Name: ' + this.state.charName}</h3>
          <div>{'HP: ' + this.state.currentHP}</div>
          <div>{'Attack: ' + this.state.charAtk}</div>
          <div>{'Armor: ' + this.state.charArmor}</div>
          <div>{'AttackRate: ' + this.state.charAtkRate}</div>
          <button type="button" onClick={this.resetState}>Go Back</button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Enter Name</h2>
          <input className="nameentry" onChange={this.handleTextChange} />
          <button type="button" onClick={this.handleSubmit}>Find Character</button>
        </div>
      )
    }

  }


}

export default Status
