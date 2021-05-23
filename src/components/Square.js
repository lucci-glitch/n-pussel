import React from 'react';

function Value(props) {
  // eslint-disable-next-line
  if (props.value == 0) {
    return null;
  }

  return (
    <span>{props.value}</span>
  );
}

class Square extends React.Component {

  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }
  
  render() {
    return (
      <button className="square" onClick={this.click}>
        <Value value={this.props.value} />
      </button>
    );
  }

  click() {
    // eslint-disable-next-line
    if(this.props.value == 0) {
      console.log("NULL")
    }
    else {
      this.props.squareToMove(this.props.value)
    }
  }

}

export default Square;