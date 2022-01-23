import React, { Component } from 'react';
import { renderIntoDocument } from 'react-dom/cjs/react-dom-test-utils.production.min';


const Key = props => (
    <div className='column'>
        <button className='button is-light'>{props.letter}</button>
    </div>
)

export default class Gameboard extends Component {

    constructor(props) {
        super(props)

        this.generateRows = this.generateRows.bind(this);

        this.state = {
            wordLength : 5,
            lives : 6
        }
    }

    componentDidMount() {

    }

    generateRows() {
        
        const width = Array.apply(null, Array(this.state.wordLength)).map(function () {})
        const length = Array.apply(null, Array(this.state.lives)).map(function () {})

        width.fill('', 0, this.state.wordLength)
        length.fill(width, 0, this.state.lives)
        console.log(length)
       // console.log(length)
       // console.log(this.state.wordLength)
        return length.map((row, i) => {
            return <div key={i}  index={i} className='columns is-variable'>
                     {row.map((tile, j) => {
                         return <div className='tile column' key={j} index={j}></div>
                     })}
                   </div>
        })


    }


    render() {
        return (
            <div>
                {this.generateRows()}
            </div>
            
        )
    }
}