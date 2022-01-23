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
            key : '',
            tile : -1,
            del : false,
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

       let currentKey = this.state.key
       let row  = this.state.row
       let currentTile = this.state.tile

        if(key === 'Enter') {
            // this.setState((state) => ({
            //     row : state.row + 1,
            //     key : '',
            //     tile : -1
            // }), () => console.log(this.state.tile))

            row = row + 1;
            currentKey = '';
            currentTile = -1;
            this.setState((state) => ({
                del : false
            }))

        } else if (key === 'DEL') {
            // this.setState((state) => ({
            //     key : '',
               
            // }) , ) 
            
           // console.log(currentTile)
           if (this.state.del) {
               currentTile --
           }

                
            currentKey = ''
                
            //currentTile -= 1
            
            this.setState((state) => ({
                del : true
            }))
            
           // console.log(currentTile)

        } else {
            // this.setState((state) => ({
            //     key : key, 
                
            //     tile : state.tile + 1
            // }), () => console.log(this.state.tile) ) 
            if(this.state.del) {
                currentTile--

                if (currentTile < 0) {
                    currentTile = -1
                }
            }

            currentKey = key;
            currentTile += 1
           // console.log(currentTile)
            this.setState((state) => ({
                del : false
            }))
        }

        if(currentTile < 0) {
            
            currentTile = -1
            console.log('huh')
           
        } else if (currentTile > 4) {
            currentTile = 4
        } else if ( currentTile === this.state.tile) {
            console.log('ok')
            //currentTile --
        }

        
        this.setState((state) => ({
            
            key : currentKey,
            tile : currentTile,
            row : row
        }),)

     
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