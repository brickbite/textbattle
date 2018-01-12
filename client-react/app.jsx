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
      inConflict: false,
      list: []

    }

    this.getUserData = this.getUserData.bind(this);
    this.resetLoadedState = this.resetLoadedState.bind(this);
    this.render = this.render.bind(this);
    this.startConflict = this.startConflict.bind(this);
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
          if (response.data[0] === undefined) {
            this.setState({
            char1Loaded: false,
            char1Data: null
          })
          } else {
          this.setState({
            char1Loaded: true,
            char1Data: response.data[0]
          })}
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
          if (response.data[0] === undefined) {
            this.setState({
            char2Loaded: false,
            char2Data: null
          })
          } else {
          this.setState({
            char2Loaded: true,
            char2Data: response.data[0]
          })}
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


  startConflict() {
    console.log('Client: startConflict invoked');
    const context = this;

    this.setState({
      inConflict: true
    })

    let updatechar1 = this.state.char1Data
    let updatechar2 = this.state.char2Data

    let log = []
    let counter = 1;
    let scriptchar2 = updatechar2.name + ' attacks!'
    let scriptchar1 = updatechar1.name + ' attacks!'

    // console.log('updatechar1', updatechar1)
    // console.log('updatechar2', updatechar2)
    // console.log('log', log)
    // console.log('scriptchar2', scriptchar2)
    // console.log('scriptchar1', scriptchar1)



    console.log('intervalIDs: ', Interval1ID, Interval2ID)



    let checkHealth = function () {
      if (updatechar1.maxhitpoints <= 0 || updatechar2.maxhitpoints <= 0) {
        clearInterval(Interval1ID);
        clearInterval(Interval2ID);
        if (updatechar1.maxhitpoints > 0) {
          log.push(updatechar1.name + ' wins!');
        }
        if (updatechar2.maxhitpoints > 0) {
          log.push(updatechar2.name + ' wins!');
        }
        context.setState({
          inConflict: false,
          list: log
        })
      }
    }



    let char1attack = function () {
      updatechar2.maxhitpoints = updatechar2.maxhitpoints - updatechar1.attackpower - updatechar2.armor;
      log.push(counter + ': ' + scriptchar1);
      counter++;
      checkHealth();
      context.setState({
        char2Data: updatechar2,
        list: log
      })
    }

    let char2attack = function () {
      updatechar1.maxhitpoints = updatechar1.maxhitpoints - updatechar2.attackpower - updatechar1.armor
      log.push(counter + ': ' + scriptchar2);
      counter++;
      checkHealth();
      context.setState({
        char1Data: updatechar1,
        list: log
      })
    }

    const Interval1ID = setInterval(char1attack, updatechar1.attackrate);
    const Interval2ID = setInterval(char2attack, updatechar2.attackrate);

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
        <h1>Text Battle</h1>
        Select Characters to Start
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
        <div className="charStatus">--vs--</div>
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
        <List ready={this.state.char1Loaded && this.state.char2Loaded} 
          user1={this.state.char1Data}
          user2={this.state.char2Data}
          record={this.state.list}
          startconflictmethod={this.startConflict}
          inconflictstate={this.state.inConflict}
          />
      </div>
    )
  }

};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
