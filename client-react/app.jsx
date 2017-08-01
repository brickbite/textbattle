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
      usernumlist: ['Character 1', 'Character 2'],
      userSlotList: [0, 1],
      char1Data: null,
      char2Data: null,
      char1Loaded: false,
      char2Loaded: false,
      inConflict: false
      
    }

    this.getUserData = this.getUserData.bind(this);
    this.resetLoadedState = this.resetLoadedState.bind(this);
    this.render = this.render.bind(this);
  }

  getUserData(request, slot) {
    console.log('Client: getUserData invoked for request:', request)
    console.log('Client: getUserData invoked for slot:', slot)

    if (slot === 0) {
      axios.get('/users', {params: {name: request}})
        .catch( err => {
          console.log('Client: GetUser Error: ', err );
          this.setState({
            char1Loaded: false
          });
        })
        .then( (response) => {
          console.log('Client: GetUser receieved ', response.data[0]);
          this.setState({
            char1Loaded: true,
            char1Data: response.data[0]
            // currentHP: response.data[0].maxhitpoints,
            // charName: response.data[0].name,
            // charAtk: response.data[0].attackpower,
            // charArmor: response.data[0].armor,
            // charAtkRate: response.data[0].attackrate,
          })
        } )
    } else if (slot === 1) {
      axios.get('/users', {params: {name: request}})
        .catch( err => {
          console.log('Client: GetUser Error: ', err );
          this.setState({
            char2Loaded: false
          });
        })
        .then( (response) => {
          console.log('Client: GetUser receieved ', response.data[0]);
          this.setState({
            char2Loaded: true,
            char2Data: response.data[0],
            // charName: response.data[0].name,
            // charAtk: response.data[0].attackpower,
            // charArmor: response.data[0].armor,
            // charAtkRate: response.data[0].attackrate,
          })
          console.log('Client: char2loaded:', this.state.char2Loaded);
        } )

    }

  }

  resetLoadedState(slot) {
    if (slot === 0) {
      this.setState({
        char1Loaded: false,
        char1Data: null,
      })
    } else if (slot === 1) {
      this.setState({
        char2Loaded: false,
        char2Data: null,
      })
    }
  }



  componentDidMount() {
    console.log('Client: mounted.');
  }





  render () {

    let char1name = null;
    let char1hp = null;
    let char1atkpwr = null;
    let char1armor = null;
    let char1atkrate = null;

    if (this.state.char1Data) {
      char1name = this.state.char1Data.name;
      char1hp = this.state.char1Data.maxhitpoints;
      char1atkpwr = this.state.char1Data.attackpower;
      char1armor = this.state.char1Data.armor;
      char1atkrate = this.state.char1Data.attackrate;
    }

    let char2name = null;
    let char2hp = null;
    let char2atkpwr = null;
    let char2armor = null;
    let char2atkrate = null;

    if (this.state.char2Data) {
      char2name = this.state.char2Data.name;
      char2hp = this.state.char2Data.maxhitpoints;
      char2atkpwr = this.state.char2Data.attackpower;
      char2armor = this.state.char2Data.armor;
      char2atkrate = this.state.char2Data.attackrate;
    }


    return (
      <div>
        <h1>Title Text</h1>
        Something appeared!
        <br></br>
        <Create />
        <Status usernum={this.state.usernumlist[0]} 
        userdataname={ char1name } 

        userdatahp={ char1hp } 

        userdataatk={ char1atkpwr } 

        userdataarmor={ char1armor } 

        userdataatkrate={ char1atkrate } 

        getmethod={this.getUserData} 
        resetstatusmethod={this.resetLoadedState} 
        slotnum={this.state.userSlotList[0]} 
        loaded={this.state.char1Loaded} />
        <Status usernum={this.state.usernumlist[1]} 
        userdataname={ char2name } 

        userdatahp={ char2hp } 

        userdataatk={ char2atkpwr } 

        userdataarmor={ char2armor } 

        userdataatkrate={ char2atkrate } 

        getmethod={this.getUserData} 
        resetstatusmethod={this.resetLoadedState} 
        slotnum={this.state.userSlotList[1]} 
        loaded={this.state.char2Loaded} />
        <List />
      </div>
    )
  }

};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
