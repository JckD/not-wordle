import React, { Component } from 'react';


// const Key = props => (
//     <div className='column'>
//         <button className='button is-light'>{props.letter}</button>
//     </div>
// )

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
     
        const width = Array.apply(null, Array(this.state.wordLength)).map(function () {return 0})
        const length = Array.apply(null, Array(this.state.lives)).map(function () {return 0})
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

        
        
        let currentTile = document.getElementsByName('row ' + this.props.row + ' tile ' + this.props.tile)


        if(this.props.correct.length > 0) {
            this.updateRow()
        }

        let key = this.props.keyPress;
   

        if (key == null) {
            key = '0'
        }

        if (currentTile.item(0) != null) {
            currentTile.item(0).children[0].innerHTML = key 
        }
       
        
    }

    updateRow() {
       // console.log(this.props.row-1)
        let lastRow = this.props.row-1
        let currentRow = document.getElementsByName('row ' + lastRow)

        //console.log(currentRow.item(0))

        for(let i = 0; i < 5; i++){
           // console.log(this.props.correct[i])
            if (this.props.correct[i] === i) {
                currentRow.item(0).children[i].classList.add('correct')
            } else if (this.props.correct[i] === -2) {
                currentRow.item(0).children[i].classList.add('almost')
            } else (
                currentRow.item(0).children[i].classList.add('wrong')
            )
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