import React, { Component } from 'react';


const Key = props => (
    <div className='column'>
        <button className='button is-light'>{props.letter}</button>
    </div>
)

export default class Gameboard extends Component {

    constructor(props) {
        super(props)
       // console.log(props)
        this.generateRows = this.generateRows.bind(this);

        this.state = {
            wordLength : 5,
            lives : 6,
            key : props.keyPress,
            tile : 0
        }
    }

    componentDidMount() {
       
    }


    generateRows() {
     
        const width = Array.apply(null, Array(this.state.wordLength)).map(function () {})
        const length = Array.apply(null, Array(this.state.lives)).map(function () {})
        width.fill('', 0, this.state.wordLength)
        length.fill(width, 0, this.state.lives)
        return length.map((row, i) => {
            return <div key={i}  Name={'row ' + i} className='columns is-variable'>
                     {row.map((tile, j) => {
                         return <div className='tile column' key={j} Name={'row ' + i + ' tile ' + j}>
                                    <h2 class="title is-3 $title-color">
                                      
                                    </h2>    
                                </div>
                     })}
                   </div>
        })
    }

    updateTile(){

        let word = this.props.word;
        let wordArr = this.props.wordArr

        console.log(wordArr)
      
        let currentRow = document.getElementsByName('row ' + this.props.row)
        
        let currentTile = document.getElementsByName('row ' + this.props.row + ' tile ' + this.props.tile)

        let key = this.props.keyPress;
        let guess = ''
        guess = guess + this.props.keyPress
        console.log(guess)

        if (key == null) {
            key = '0'
        }
       // console.log(currentTile.item(0).children[0])

        if (currentTile.item(0) != null) {
            console.log(currentTile.item(0))
            currentTile.item(0).children[0].innerHTML = key 
        }
       
        
    }


    render() {
        return (
            <div>
                
                {this.generateRows()}
                {this.updateTile()}
            </div>
            
        )
    }
}