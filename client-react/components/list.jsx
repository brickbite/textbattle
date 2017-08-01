import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: [1,2,3,4,5,6]
    }

    // this.handllogeSubmit = this.handleSubmit.bind(this);
    // this.handleTextChange = this.handleTextChange.bind(this);
    // this.resetState = this.resetState.bind(this);
  }

  resetLog() {
    console.log('List: resetLog invoked ');

   this.setState({
      // slotnumber: this.props.number,
      log: []
    })
  }

  componentDidMount() {
    console.log('List: mounted.');
    console.log(this.state.log);
  }

  render() {
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

export default List;
