import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './components/Board.js'
import Modal from './components/Modal';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      solved: false,
    };
  }

  handleChange() {
    if (!this.state.solved) {
      this.setState({ solved: true });
      console.log("Solved")
    }
  }

  render() {
    const ifSolved = this.state.solved;
    let modal;
    if (ifSolved) {
      modal = <Modal/>;
    }

    return (
      <div>
        {modal}
        <div className="game-board">
          <Board solved={this.handleChange} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
