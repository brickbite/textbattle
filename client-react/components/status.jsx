import React from 'react';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user1text: 'user1 goes here',
      user2text: 'user2 goes here'
    }
  }

  handleSubmit(entry, content) {
    console.log('Status: handleSubmit invoked');
  }

  render() {
    return (
      <div>
        <h2>Status is here</h2>
        {this.props.user1}
      </div>
    )
  }


}

export default Status
