import React from 'react';
import axios from 'axios';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // slotnumber: this.props.number,
      formLoadedState: false,
      failedCreate: false,
      currentHP: null,
      charName: null,
      charAtk: null,
      charArmor: null,
      charAtkRate: null,
      nameentrytext: null
      
    }

    this.handleCreateButtonSubmit = this.handleCreateButtonSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  resetState() {
    console.log('Status: resetState invoked for: ');

   this.setState({
      // slotnumber: this.props.number,
      formLoadedState: false,
      failedCreate: false,
      currentHP: null,
      charName: null,
      charAtk: null,
      charArmor: null,
      charAtkRate: null,
      nameentrytext: null
    })
  }


  handleSubmit() {
    console.log('Create: handleSubmit invoked for: ', this.state.nameentrytext);

    axios.post('/users', {
      "name": this.state.nameentrytext,
      "maxhitpoints": Math.max(30, Math.floor(Math.random() * 100)),
      "attackpower": Math.max(1, Math.floor(Math.random() * 10)),
      "armor": Math.floor(Math.random() * 2),
      "attackrate": Math.min(3000, Math.floor(Math.random() * 5000))
    })
      .catch( err => {
        console.log('Create: createUser Error: ', err );
        this.setState({
          failedCreate: true
        });
      })
      .then( (response) => {
        console.log('Create: createUser receieved ', response.data);
        this.setState({
          failedCreate: false
        })
      } )
  }

  handleTextChange(event, field) {
    // console.log('handleTextChange invoked', event.target.value);
    // console.log('this: ', this);
    this.setState({
      nameentrytext: event.target.value
    })
  }

  componentDidMount() {
    console.log('Create Component mounted');
  }

  handleCreateButtonSubmit() {
    this.setState({
      formLoadedState: true
    })
  }

  render() {
    if (this.state.formLoadedState) {
      return (
        <div>
          <button type="button" onClick={this.resetState}>Go Back</button>
          <br></br>
          <input className="nameentry" placeholder="Enter a name..." onChange={this.handleTextChange}/>
          <button type="button" onClick={this.handleSubmit}>Create</button>
        </div>
      )
    } else {
      return (
        <div>
          <button type="button" onClick={this.handleCreateButtonSubmit}>Create Character</button>
        </div>
      )
    }

  }


}

export default Create;
