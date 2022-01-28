import React, { Component } from 'react';
import Gameboard from './gameboard.component'
import Scorecard from './scorecard.component';


const Key = props => (
    <div className='column'>
        <button className='button is-light'onClick={props.keyPress} onKeyPress={props.keyPress} >{props.letter}</button>
    </div>
)

export default class Keyboard extends Component {

    constructor(props) {
        super(props)

        this.generateRows = this.generateRows.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.updateKeyboard = this.updateKeyboard.bind(this);

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
            lettersChosen : [],
            gameOver : false
        }
    }



    componentDidMount() {
        this.pickWord()
    }

    newGame() {
        window.location.reload()
    }

    pickWord() {
        const words = require('../assets/words.txt');

        fetch(words)
        .then(res => res.text())
        .then(text => {
            const arrayOfWords = text.split(' ')
            let rand = Math.floor(Math.random() * arrayOfWords.length);
            let word = arrayOfWords[rand]
            let wordArr = word.split('')
            
           this.setState((state) => ({
                word : word,
                wordArr : wordArr
           }), () => console.log(this.state.word))
        })
        
    }

    generateRows() {
        let pressKey = this.keyPress;
        
        const firstLineArr = ['Q','W','E','R','T','Y','U','I','O','P']
        const secondLineArr = ['A','S','D','F','G','H','J','K','L']
        const thirdLineArr = ['Enter','Z','X','C','V','B','N','M', 'DEL']

        let rows = [firstLineArr, secondLineArr, thirdLineArr]

        return rows.map(function(row, i){
            return <div key={i} className='columns is-variable is-1 is-mobile'> 
                    {row.map(function(letters, j){
                    return <Key key={j} index={j} letter={letters} keyPress={() => pressKey(letters)}/>
                    })}
                  </div>
        })
    }

    updateKeyboard(correct, guess) {
        this.setState((state) => ({
            lettersChosen : [...state.lettersChosen, guess]
        }), () => {

            let keyboard = document.getElementsByClassName('button')
            
           let guessArr = guess.split('')
           let correctLetters = ''


            correct.forEach(element => {
                //console.log(element)
                if (element >= 0) {
                    correctLetters = correctLetters + guessArr[element]
                }
            });

           // console.log(correctLetters)

            for(let i = 0; i < keyboard.length; i++) {
               
                if (guess.includes(keyboard[i].innerHTML)) {
                    keyboard[i].classList.remove('is-light')
                    keyboard[i].classList.remove('is-warning')
                   
                    if (correctLetters.includes(keyboard[i].innerHTML)) {
                        keyboard[i].classList.add('is-success')
                    } else if (this.state.word.includes(keyboard[i].innerHTML)) {
                        keyboard[i].classList.add('is-warning')
                    } else {
                        keyboard[i].classList.add('is-dark')
                    }
                }
               
            }
        })
    }

    compareWords(row) {
        let wordArr = this.state.wordArr
        let guess = this.state.guess

        let guessArr = guess.split('')
        let correct  = [];
            for(let i = 0; i< wordArr.length; i++) {

                if (wordArr[i] === guessArr[i]) {
                    correct.push(i)

                } else if (wordArr.includes(guessArr[i])) {

                    correct.push(-2)
                } else {

                    correct.push(-1)
                }
            }
    
            this.updateKeyboard(correct, guess)
            this.setState((state) => ({
                correct : correct
            }),() => {

                if(!correct.includes(-1) && !correct.includes(-2)) {
                    this.setState((state) => ({
                        gameOver : true
                    }))
                }
            })

    }

    gameOver() {
        console.log(this.state.gameOver)

        // Turn the rest of the word to lowser case and pass it to the scorecard
        let startingLetter = this.state.word.slice(0, 1)
        let word = this.state.word.slice(1, this.state.word.length).toLowerCase();
        word = startingLetter + word    
        


        let score = 7 - this.state.row;
        console.log(this.state.row)

        if (this.state.gameOver) {
            return <Scorecard score={score} word={word} newGame={() => this.newGame()}/>
        }

    }

    keyboardInput() {


    }

    keyPress(key){

       let currentKey = this.state.key
       let row  = this.state.row
       let currentTile = this.state.tile
       let guess = this.state.guess


        if(key === 'Enter') {
   

            if(guess.length === 5) {
                currentKey = '';
                currentTile = -1;

                if( row === 6) {
                    this.setState((state) => ({
                        gameOver : true
                    }))
                } else {
                    row = row + 1; 
                }
                    
                this.compareWords(row)

                this.setState((state) => ({
                    del : false,
                }))
            }


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
            
            currentTile += 1
            if (guess.length > 5) {
                guess = guess.substring(guess.length-1, guess.length)
                this.setState((state) => ({
                    correct: []
                }))
            }
            guess = guess + key

            this.setState((state) => ({
                del : false
            }))
        }

        if(currentTile < 0) {
            
            currentTile = -1
           
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



    render() {
        return (
            <>
            <div class="board-container">
                <Gameboard keyPress={this.state.key} row={this.state.row} tile={this.state.tile} correct={this.state.correct}/>
                {this.gameOver()}
            </div>
            <div id='keyboard'>{this.generateRows()}</div>
            </>
            
            
        )
    }
}