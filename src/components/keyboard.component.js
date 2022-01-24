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
            word : '',
            wordArr : [],
            guess : '',
            guessArr : [],
            correct : [],
            contains : []
        }
    }

    componentDidMount() {

        this.pickWord()
    }

    pickWord() {
        const words = require('../assets/words.txt');

        fetch(words)
        .then(res => res.text())
        .then(text => {
            const arrayOfWords = text.split(' ')
            //console.log(arrayOfWords)
            let rand = Math.floor(Math.random() * arrayOfWords.length);
            let word = arrayOfWords[rand]
            console.log(word)
            let wordArr = word.split('')
            
           this.setState((state) => ({
                word : word,
                wordArr : wordArr
           }))
        })

        
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

    compareWords() {
        let wordArr = this.state.wordArr
        let guess = this.state.guess

        let guessArr = guess.split('')
        console.log(guessArr)
        for(let i = 0; i< wordArr.length; i++) {

            if (wordArr[i] === guessArr[i]) {
                console.log('word contains ' + wordArr[i])

                this.setState((state) => ({
                    correct : [...state.correct, i]
                }))

                
            } else if (wordArr.includes(guessArr[i])) {
                this.setState((state) => ({
                    correct : [...state.correct, -2]
                }))
            } else {
                this.setState((state) =>({
                    correct : [...state.correct, -1]
                }))
            }
        }
            
        
    }

    keyPress(key){
       // console.log(key)

       let currentKey = this.state.key
       let row  = this.state.row
       let currentTile = this.state.tile
       let guess = this.state.guess


        if(key === 'Enter') {


            row = row + 1;
            currentKey = '';
            currentTile = -1;
            console.log(this.state.guess)
            this.compareWords()
            this.setState((state) => ({
                del : false
            }))

        } else if (key === 'DEL') {
           if (this.state.del) {
               currentTile --
           }
                
            currentKey = ''
            guess = guess.slice(0, -1)
            
            this.setState((state) => ({
                del : true,
                guess : guess
            }))
            

        } else {
   
            if(this.state.del) {
                currentTile--

                if (currentTile < 0) {
                    currentTile = -1
                }
            }

            currentKey = key;
            guess = guess + key
            currentTile += 1

            this.setState((state) => ({
                del : false
            }))
        }

        if(currentTile < 0) {
            
            currentTile = -1
            console.log('huh')
           
        } else if (currentTile > 4) {
            currentTile = 4
        }

        
        this.setState((state) => ({
            
            key : currentKey,
            tile : currentTile,
            row : row,
            guess : guess
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
                <Gameboard keyPress={this.state.key} row={this.state.row} tile={this.state.tile} correct={this.state.correct}/>
            </div>
            <div>{this.generateRows()}</div>
            </>
            
            
        )
    }
}