import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyState: false,
      log: [1,2,3,4,5,6]
    }

    // this.handllogeSubmit = this.handleSubmit.bind(this);
    // this.handleTextChange = this.handleTextChange.bind(this);
    // this.resetState = this.resetState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resetLog = this.resetLog.bind(this);
  }

  resetLog() {
    console.log('List: resetLog invoked ');

   this.setState({
      // slotnumber: this.props.number,
      readyState: false,
      log: []
    })
  }


  componentWillReceiveProps(nextprops) {
    console.log('List: compWillReceiveProps:', nextprops);
    this.setState({
      // slotnumber: this.props.number,
      readyState: nextprops.ready,
      log: nextprops.record
    });
  }


  componentDidMount() {
    console.log('List: mounted.');
    console.log(this.state.log);
  }

  handleClick() {
    console.log('List: startConflict invoked');
    console.log(this);
    this.props.startconflictmethod();
  }

  render() {
    if (this.state.readyState) {
      return (
        <div>
          <h2>List Goes Here</h2>
          <button type="button" onClick={this.handleClick}>START</button>
          {this.state.log.map(entry => {
            return (
              <div key={entry}>{entry}</div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <h2>List Goes Here</h2>
          {this.state.log.map(entry => {
            return (
              <div key={entry}>{entry}</div>
            )
          })}
        </div>
      )
    }
  }
}

export default List;
