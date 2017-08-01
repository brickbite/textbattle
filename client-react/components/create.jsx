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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }


  resetState() {
    console.log('Status: resetState invoked for: ', this.state.nameentrytext);

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

    axios.post('/users', {params: {name: this.state.nameentrytext}})
      .catch( err => {
        console.log('Create: createUser Error: ', err );
        this.setState({
          failedCreate: true
        });
      })
      .then( (response) => {
        console.log('Create: createUser receieved ', response.data[0]);
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



  render() {
    if (this.state.formLoadedState) {
      return (
        <div>
          <form action="/action_page.php" method="get">
            First name: <input type="text" name="fname"> </input><br></br>
            Last name: <input type="text" name="lname"> </input><br></br>
            Last name: <input type="text" name="lname"> </input><br></br>
            Last name: <input type="text" name="lname"> </input><br></br>
            <input type="submit" value="Submit"> </input>
          </form>
          <button type="button" onClick={this.resetState}>Go Back</button>
        </div>
      )
    } else {
      return (
        <div>
          <button type="button" onClick={this.handleSubmit}>Create Character</button>
        </div>
      )
    }

  }


}

export default Create;
