import React from 'react';
import Square from './Square.js'

const WIN_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        };
    }

    findSquare = (squareValue) => {
        const squarePosition = this.state.numbers.indexOf(squareValue)
        return squarePosition
    }

    checkIfCorrect = () => {
        const array = [...this.state.numbers]
        array.splice(this.findSquare(0),1)

        if(JSON.stringify(WIN_STATE) === JSON.stringify(array)) {
            return true
        }
        else {
            return false
        }
    }

    whichRow = (position) => {
        if (position <= 4) {
            return 1
        }
        if (position >= 5 && position <= 9) {
            return 2
        }
        if (position >= 10 && position <= 14) {
            return 3
        }
    }

    sameColumn = (firstPosition, secondPosition) => {
        if (firstPosition > secondPosition) {
            const temp = firstPosition - secondPosition
            if (temp % 5 === 0) {
                return true
            }
        }
        if (firstPosition < secondPosition) {
            const temp = secondPosition - firstPosition
            if (temp % 5 === 0) {
                return true
            }
        }
    }

    moveSquareOnRow = (list, empt, sqr) => {
        const arr = list;

        if (empt > sqr) {
            let next = empt - 1;
            for (let index = empt; index > sqr; index--) {
                [arr[index], arr[next]] = [arr[next], arr[index]]
                next--
            }
        }

        if (empt < sqr) {
            let next = empt + 1;
            for (let index = empt; index < sqr; index++) {
                [arr[next], arr[index]] = [arr[index], arr[next]]
                next++
            }
        }

        return arr
    }

    moveSquareOnCol = (list, empt, sqr) => {
        const arr = list;
        let next = empt
        if (empt > sqr) {
            next -= 5;
            for (let index = empt; index > sqr; index -= 5) {
                [arr[index], arr[next]] = [arr[next], arr[index]]
                next -= 5
            }
        }

        if (empt < sqr) {
            next += 5;
            for (let index = empt; index < sqr; index += 5) {
                [arr[next], arr[index]] = [arr[index], arr[next]]
                next += 5
            }
        }
        return arr
    }

    handleSquareMovement(arr) {
        this.setState({numbers: arr});
      }

    movableSquare = (value) => {
        const emptySquare = (this.findSquare(0));
        const square = (this.findSquare(value))

        //check if same row
        if (this.whichRow(emptySquare) === this.whichRow(square)) {
            this.handleSquareMovement(this.moveSquareOnRow(this.state.numbers, emptySquare, square))
        }
        //check if same column
        if (this.sameColumn(emptySquare, square)) {
            this.handleSquareMovement(this.moveSquareOnCol(this.state.numbers, emptySquare, square))
        }
    }

    shuffleArray(list) {
        const array = list
        for (var i = array.length - 1; i > 0; i--) {

            // Generate random number 
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    onShuffleNumbers = () => {
        this.setState(state => {
            const numbers = this.shuffleArray(state.numbers)
            return {
                numbers,
            }
        })
    }

    renderSquare(i, x, y) {
        return <Square key={i} value={i} x={x} y={y} squareToMove={this.movableSquare} />;
    }

    componentDidUpdate(prevState) {

        if(this.checkIfCorrect()) {
            this.props.solved()
        }    
    }

    componentDidMount() {
       // this.onShuffleNumbers()
    }

    render() {
        
        return (
            <div className="board">
                <div className="board-grid">
                    {this.state.numbers.map(number => (
                        this.renderSquare(number)
                    ))}
                </div>
                <div className="container mt-3">
                <button className="button" onClick={this.onShuffleNumbers}>Slumpa</button>
                </div>
            </div>
        );
    }
}

export default Board;