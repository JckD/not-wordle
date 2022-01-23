import React, { Component } from 'react';
import Gameboard from './gameboard.component'


const Key = props => (
    <div className='column'>
        <button className='button is-light'onClick={props.keyPress}>{props.letter}</button>
    </div>
)

export default class Keyboard extends Component {

    constructor(props) {
        super(props)

        this.generateRows = this.generateRows.bind(this);
        this.generateLetters = this.generateLetters.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.state = {
            row : 0,
            tile : 0,
            key : '',
        }
    }

    componentDidMount() {

    }

    generateRows() {
        let pressKey = this.keyPress;
        
        const firstLineArr = ['Q','W','E','R','T','Y','U','I','O','P']
        const secondLineArr = ['A','S','D','F','G','H','J','K','L']
        const thirdLineArr = ['Enter','Z','X','C','V','B','N','M', 'DEL']

        let rows = [firstLineArr, secondLineArr, thirdLineArr]

        return rows.map(function(row, i){
            return <div  key={i} className='columns is-variable is-1'> 
                    {row.map(function(letters, j){
                    return <Key key={j} index={j} letter={letters} keyPress={() => pressKey(letters)}/>
                    })}
                  </div>
        })


    }

    keyPress(key){
       // console.log(key)
        if(key === 'Enter') {
            this.setState((state) => ({
                row : state.row + 1,
                key : '',
                tile : -1
            }), () => console.log(this.state.tile))

        } else if (key === 'DEL') {
            this.setState((state) => ({
                key : '',
               
            }) , ) 
            this.setState((state) => ({
                tile : state.tile -1
            }))

        } else {
            this.setState((state) => ({
                key : key, 
                
                tile : state.tile + 1
            }), () => console.log(this.state.tile) ) 
        }

     
    }

    generateLetters() {
        return <p>hi</p>
    }



    render() {
        let keyPressed = this.state.key
       // console.log(keyPressed)
        return (
            <>
            <div class="board-container">
                <Gameboard keyPress={this.state.key} row={this.state.row} tile={this.state.tile}/>
            </div>
            <div>{this.generateRows()}</div>
            </>
            
            
        )
    }
}